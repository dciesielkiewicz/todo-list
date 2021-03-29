import { useRef } from 'react';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import { Box, Grid, IconButton, makeStyles } from '@material-ui/core';
import IconCheck from '@material-ui/icons/Check';
import IconAdd from '@material-ui/icons/Add';

import { Input } from 'components';

import { emptyTodo, FORM_FIELD_TITLE } from '../constants';
import { INewTodo, TNewTodoResetForm } from '../types';
import { validationSchema } from '../validationSchema';

const useStyles = makeStyles(() => ({
  inputColumn: {
    flex: 1,
  }
}));

interface IAddTodoProps {
  handleAddTodoSubmit: (todo: INewTodo, resetForm: TNewTodoResetForm) => void;
}

export const AddTodo = ({ handleAddTodoSubmit }: IAddTodoProps) => {
  const classes = useStyles();
  const inputRef = useRef<HTMLInputElement>();

  const focusInput = () => inputRef.current?.focus();

  const submitHandler = (values: INewTodo, { resetForm }: FormikHelpers<INewTodo>) => {
    handleAddTodoSubmit(values, resetForm);
  };

  return (
    <Formik
      initialValues={emptyTodo}
      onSubmit={submitHandler}
      validateOnChange={false}
      validateOnBlur={false}
      validationSchema={validationSchema}
    >
      <Form>
        <Box pt={1} pb={1} mb={2}>
          <Grid container spacing={1} alignItems="center" justify="space-between">
            <Grid item className={classes.inputColumn}>
              <Field
                component={Input}
                inputProps={{
                  ref: inputRef,
                }}
                name={FORM_FIELD_TITLE}
                placeholder="Type your next todo"
              />
            </Grid>
            <Grid item>
              <IconButton type="submit">
                <IconCheck />
              </IconButton>
            </Grid>
          </Grid>
        </Box>
        <div>
          <IconButton color="primary" onClick={focusInput} data-testid="focus-input-button">
            <IconAdd />
          </IconButton>
        </div>
      </Form>
    </Formik>
  );
};