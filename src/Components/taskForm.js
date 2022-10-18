
// material ui imports
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

// formik imports
import { Formik } from "formik";

// yup imports for validation
import * as Yup from "yup";


export default function TaskForm({
    inputsProps,
    handleSubmit,
    title,
    submitLabel,
    children
}) {
    const validationSchema = {};
    const initialValues = {};
    inputsProps.forEach(({ id, validation, initialValue }) => {
        validationSchema[id] = validation;
        initialValues[id] = initialValue;
    });

    return (
        <Container component="main">
            <CssBaseline />
            <div>
                <Typography style={{ textAlign: "center", marginTop: "10%" }} component="h1" variant="h5">
                    {title}
                </Typography>
                <Formik
                    initialValues={initialValues}
                    enableReinitialize
                    validationSchema={Yup.object().shape(validationSchema)}
                    onSubmit={handleSubmit}
                >
                    {({
                        errors,
                        handleBlur,
                        handleChange,
                        handleSubmit,
                        isSubmitting,
                        touched,
                        values,
                    }) => (
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleSubmit();
                            }}
                        >
                            {children}
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    gridTemplateColumns: " auto auto auto auto",
                                }}
                            >
                                {inputsProps.map(({ id, label, type, options }) =>
                                (
                                    <TextField
                                        error={Boolean(touched[id] && errors[id])}
                                        helperText={touched[id] && errors[id]}
                                        size="small"
                                        margin="normal"
                                        style={{ marginBottom: "15%" }}
                                        type={type}
                                        id={id}
                                        label={label}
                                        name={id}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values[id]}
                                        variant="outlined"
                                        key={id + label + type}
                                    />
                                )
                                )}
                            </div>
                            <div>
                                <Button
                                    variant="contained"
                                    type="submit"
                                    color="primary"
                                    style={{
                                        marginTop: 50,
                                        margin: "auto",
                                        display: "block"
                                    }}
                                    disabled={isSubmitting}
                                >
                                    {submitLabel}
                                </Button>
                            </div>
                        </form>
                    )}
                </Formik>
            </div>
        </Container>
    );
}