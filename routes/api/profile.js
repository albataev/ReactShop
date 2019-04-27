const express = require('express');

const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load Mongoose models
const Profile = require('../../models/Profile');
const User = require('../../models/User');

// Load validation
const validateProfileInput = require('../../validation/profile');
const validateExperienceInput = require('../../validation/validateCatalogItem');
const validateEducationInput = require('../../validation/education');

// @route   GET api/profile
// @desc    Get current user profile
// @access  Private

router.get('/',
  // passport.authenticate('jwt', { session: false }),
  (req, res) => {
    console.log('GET api/profile fired: ');
    const errors = {};
    // Profile.findOne({ user: req.user.id })
    Profile.findOne()
      // .populate('user', ['name', 'avatar'])
      .then(profile => {
        if (!profile) {
          errors.noprofile = 'There is no profile for this user';
          return res.status(404).json(errors);
        }
        return res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  });

// @route   GET api/profile/all
// @desc    Get all profiles
// @access  Public

router.get('/all',
  (req, res) => {
    const errors = {};
    Profile.find()
      .populate('user', ['name', 'avatar'])
      .then(profiles => {
        if (!profiles) {
          errors.noprofiles = 'There are no profiles';
          return res.status(404).json(errors);
        }
        return res.json(profiles);
      })
      .catch(err => {
        console.log(err);
        return res.status(404).json({ profiles: 'DB Error. There are no profiles' });
      });
  }
);

// @route   GET api/profile:handle
// @desc    Get profile by handle
// @access  Public

router.get('/handle/:handle',
  (req, res) => {
    const errors = {};
    // handle - temporary load profile page
    // Profile.findOne({ handle: 'Alex' })
    Profile.findOne()
      // .populate('user', ['name', 'avatar'])
      .then(profile => {
        if (!profile) {
          errors.noprofile = 'There is no profile for this user';
          return res.status(404).json(errors);
        }
        return res.json(profile);
      })
      .catch(() => res.status(404).json({ noprofile: 'There is no profile for this user' }));
  });

// @route   GET api/profile:user_id
// @desc    Get profile by user ID
// @access  Public

router.get('/user/:user_id',
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.params.user_id })
      .populate('user', ['name', 'avatar'])
      .then(profile => {
        if (!profile) {
          errors.noprofile = 'There is no profile for this user';
          return res.status(404).json(errors);
        }
        return res.json(profile);
      })
      .catch(() => {
        res.status(404).json({ profile: 'There is no profile for this user' });
      });
  });

// @route   POST api/profile
// @desc    Create or edit user profile
// @access  Private

router.post('/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);
    // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
    // Get fields
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle !== undefined) profileFields.handle = req.body.handle;
    if (req.body.company !== undefined) profileFields.company = req.body.company;
    if (req.body.website !== undefined) profileFields.website = req.body.website;
    if (req.body.location !== undefined) profileFields.location = req.body.location;
    if (req.body.bio !== undefined) profileFields.bio = req.body.bio;
    if (req.body.status !== undefined) profileFields.status = req.body.status;
    if (req.body.githubusername !== undefined) profileFields.githubusername = req.body.githubusername;
    // Skills split into array
    if (typeof req.body.skills !== 'undefined') {
      profileFields.skills = req.body.skills.split(',');
    }
    // Fill dictionary Social with checking
    profileFields.social = {};
    if (req.body.twitter !== undefined) profileFields.social.twitter = req.body.twitter;
    if (req.body.facebook !== undefined) profileFields.social.facebook = req.body.facebook;
    if (req.body.youtube !== undefined) profileFields.social.youtube = req.body.youtube;
    if (req.body.linkedin !== undefined) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.instagram !== undefined) profileFields.social.instagram = req.body.instagram;


    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (profile) {
          // Update profile
          Profile.findOneAndUpdate(
            { user: req.user.id },
            { $set: profileFields },
            { new: true })
            .then(profile => res.json(profile))
            .catch(err => {
              res.status(400).json(err);
              console.log(err);
            });
        } else {
          // Create Profile

          // Check if handle exists
          Profile.findOne({ handle: profileFields.handle })
            .then(profile => {
              if (profile) {
                errors.handle = 'That handle already exists';
                return res.status(400).json(errors);
              }
              // Save profile
              new Profile(profileFields)
                .save()
                .then(profile => res.json(profile))
                .catch(err => {
                  console.log('[POST api/profile]', err.message);
                  res.status(404).json({
                    errorsavingprofile: 'Error saving created profile',
                    'Error saving on POST api/profile': err.message });
                });
            })
            .catch(err => {
              res.status(400).json(err);
              console.log(err);
            });
        }
      })
      .catch(err => {
        console.log('[POST api/profile]', err.message);
        res.status(404).json({
          noprofilefound: 'No profile found',
          'Error in finding profile POST api/profile/': err.message });
      });
  });

// @route   POST api/profile/experience
// @desc    Add experience to the user profile
// @access  Private

router.post(
  '/experience',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateExperienceInput(req.body);

    // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        const newExp = {
          title: req.body.title,
          company: req.body.company,
          location: req.body.location,
          from: req.body.from,
          to: req.body.to,
          current: req.body.current,
          description: req.body.description
        };

        // Add to experience array
        profile.experience.unshift(newExp);

        profile.save()
          .then(profile => res.json(profile))
          .catch(err => {
            console.log('[POST api/profile/experience]', err.message);
            res.status(404).json({
              errorsavingprofile: 'Error saving profile after adding experience',
              'Error saving on POST api/profile/experience': err.message });
          });
      })
      .catch(err => {
        console.log('[POST api/profile/experience]', err.message);
        res.status(404).json({
          noprofilefound: 'No profile found',
          'Error in finding profile POST api/profile/experience': err.message });
      });
  });

// @route   POST api/profile/education
// @desc    Add education to the user profile
// @access  Private

router.post(
  '/education',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateEducationInput(req.body);

    // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        const newEdu = {
          school: req.body.school,
          degree: req.body.degree,
          fieldofstudy: req.body.fieldofstudy,
          from: req.body.from,
          to: req.body.to,
          current: req.body.current,
          description: req.body.description
        };

        // Add to education array
        profile.education.unshift(newEdu);

        profile.save()
          .then(profile => res.json(profile))
          .catch(err => {
            console.log('[POST api/profile/education]', err.message);
            res.status(404).json({
              errorsavingprofile: 'Error saving profile after adding education',
              'Error saving on POST api/profile/education': err.message });
          });
      })
      .catch(err => {
        console.log('[POST api/profile/education]', err.message);
        res.status(404).json({
          noprofilefound: 'No profile found',
          'Error in finding profile POST api/profile/education': err.message });
      });
  });

// @route   DELETE api/profile/experience/:exp_id
// @desc    Delete experience from profile
// @access  Private

router.delete(
  '/experience/:exp_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (!profile) {
          return res.status(404).json({ noprofile: 'There is no profile for this user' });
        }

        // Get remove index
        const removeIndex = profile.experience
          .map(item => item.id)
          .indexOf(req.params.exp_id);

        // Splice out array
        profile.experience.splice(removeIndex, 1);

        // Save
        profile.save()
          .then(profile => res.json(profile))
          .catch(err => {
            console.log('[DELETE api/profile/experience/:exp_id]', err.message);
            res.status(404).json({
              errorsavingprofile: 'Error saving profile after deletion experience',
              'Error saving on DELETE api/profile/experience/:exp_id': err.message });
          });
      })
      .catch(err => {
        console.log('[DELETE api/profile/experience/:exp_id]', err.message);
        res.status(404).json({
          noprofilefound: 'No profile found',
          'Error in finding profile DELETE api/profile/experience/:exp_id': err.message });
      });
  });

// @route   DELETE api/profile/education/:edu_id
// @desc    Delete education from profile
// @access  Private

router.delete(
  '/education/:edu_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (!profile) {
          return res.status(404).json({ noprofile: 'There is no profile for this user' });
        }

        // Get remove index
        const removeIndex = profile.education
          .map(item => item.id)
          .indexOf(req.params.edu_id);

        // Splice out array
        profile.education.splice(removeIndex, 1);

        // Save
        profile.save()
          .then(profile => res.json(profile))
          .catch(err => {
            console.log('[DELETE api/profile/education/:edu_id]', err.message);
            res.status(404).json({
              errorsavingprofile: 'Error saving profile after deletion education',
              errordescription: err.message });
          });
      })
      .catch(err => {
        console.log('[DELETE api/profile/education/:edu_id]', err.message);
        res.status(404).json({
          noprofilefound: 'No profile found',
          errordescription: err.message });
      });
  });

// @route   DELETE api/profile/
// @desc    Delete user and profile
// @access  Private

router.delete(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const result = {};
    const errors = {};
    Profile.findOneAndRemove({ user: req.user.id })
      .then(() => {
        result.userdeleted = 'success';
        User.findOneAndRemove({ _id: req.user.id })
          .then(() => {
            result.userprofiledeleted = 'success';
            res.json(result);
          })
          .catch(err => {
            console.log('[Error in removing user DELETE api/profile/]', err.message);
            errors.nouserfound = err.message;
            res.status(404).json(errors);
          });
      })
      .catch(err => {
        console.log('[Error in removing user profile DELETE api/profile/]', err.message);
        errors.noprofilefound = err.message;
        res.status(404).json(errors);
      });
  });

module.exports = router;
