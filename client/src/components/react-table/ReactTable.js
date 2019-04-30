import React from 'react';
import set from 'lodash/fp/set';
import { Field } from 'redux-form';
import Table from 'react-table';
// import * as BS from 'react-bootstrap';
import { FormControl, Card, Button } from 'react-bootstrap';
import initialData from './dataFactory';
import FormProvider from './FormProvider';
import { avatarColumnProps } from './AvatarCell';
import ActionsCell from './ActionsCell';
import HighlightCell from './HighlightCell';
import GridFilters from './GridFilters';

export default class ReactTable extends React.Component {
    state = { data: initialData, editing: null };

    editableComponent = ({ input, editing, value, ...rest }) => {
      const Component = editing ? FormControl : FormControl.Static;
      const children = (!editing && <HighlightCell value={value} {...rest} />) || undefined;
      return <Component {...input} {...rest} children={children} />;
    };

    editableColumnProps = {
      ...GridFilters,
      Cell: props => {
        const editing = this.state.editing === props.original;
        const fieldProps = {
          component: this.editableComponent,
          editing,
          props
        };

        return <Field name={props.column.id} {...fieldProps} />;
      }
    };

    getActionProps = (gridState, rowProps) => (rowProps && {
      mode: this.state.editing === rowProps.original ? 'edit' : 'view',
      actions: {
        onEdit: () => this.setState({ editing: rowProps.original }),
        onCancel: () => this.setState({ editing: null })
      }
    })
        || {};

    columns = [
      {
        Header: '',
        maxWidth: 90,
        filterable: false,
        getProps: this.getActionProps,
        Cell: ActionsCell
      },
      { Header: '', accessor: 'avatar', ...avatarColumnProps },
      { Header: 'Name', accessor: 'name', ...this.editableColumnProps },
      { Header: 'Email', accessor: 'email', ...this.editableColumnProps },
      { Header: 'Phone', accessor: 'phone', ...this.editableColumnProps }
    ];

    handleSubmit = values => {
      this.setState(state => {
        const index = this.state.data.indexOf(this.state.editing);
        return {
          data: set(`[${index}]`, values, state.data)
        };
      });
    };

    render() {
      return (
        <React.Fragment>
          <h1>react-table inline editing</h1>
          <Card bsStyle="primary">
            <Card.Title>
              <Button className="pull-right">Add New</Button>
            </Card.Title>

            <FormProvider
              form="inline"
              onSubmit={this.handleSubmit}
              onSubmitSuccess={() => this.setState({ editing: null })}
              initialValues={this.state.editing}
              enableReinitialize
            >
              {formProps => (
                <form onSubmit={formProps.handleSubmit}>
                  <Table
                    columns={this.columns}
                    data={this.state.data}
                    defaultPageSize={5}
                  />
                </form>
              )}
            </FormProvider>
          </Card>
        </React.Fragment>
      );
    }
}
