import { reduxForm } from 'redux-form';

const toRenderProp = ({ children, ...rest }) => children(rest);
export default reduxForm()(toRenderProp);
