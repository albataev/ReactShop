import React from 'react';
import { Button } from 'react-bootstrap';

const editModes = {
  view: props => (
    <Button bsSize="xs" bsStyle="link" onClick={props.onEdit}>
            Edit
    </Button>
  ),
  edit: props => (
    <React.Fragment>
      <Button type="submit" bsStyle="link" bsSize="xs">
                Save
      </Button>

      <Button bsStyle="link" bsSize="xs" onClick={props.onCancel}>
                Cancel
      </Button>
    </React.Fragment>
  )
};

export default function ActionsCell(props) {
  const {
    mode,
    actions: { onEdit, onCancel }
  } = props.columnProps.rest;
  const Buttons = editModes[mode];
  return <Buttons onEdit={() => onEdit(props.index)} onCancel={onCancel} />;
}
