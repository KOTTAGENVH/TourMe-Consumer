import { useState } from "react";
import { Box, Typography, TextField, Grid, Button } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { signUp } from "../../Api/services/authService";
import { ToastContainer, toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

const validationSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  role: Yup.string().required("Role is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

function SignUp() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      role: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const res = await signUp(
          values.username,
          values.email,
          values.role,
          values.password
        );
        if (res.error) {
          toast.error("Sorry, your data verification failed");
        } else {
          toast.success("Password changed successfully");
          formik.resetForm();
          navigate("/");
        }
      } catch (err) {
        toast.error("Sorry, your data verification failed");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <ToastContainer />
      {loading ? (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box
          sx={{
            color: "black",
            padding: "2rem",
            borderRadius: "20px",
            backdropFilter: "blur(10px)",
            background: "rgba(255, 255, 255, 0.1)",
            boxShadow:
              "0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.05)",
            justifyContent: "center",
            alignItems: "center",
            width: "md",
            marginBottom: "10%",
            textAlign: "center",
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            Create New Account
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="username"
                  label="Username"
                  variant="standard"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  sx={{
                    fontSize: "1.2rem",
                    marginTop: "2%",
                  }}
                />
                {formik.touched.username && formik.errors.username && (
                  <Typography variant="caption" color="error">
                    {formik.errors.username}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="email"
                  label="Email"
                  variant="standard"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  sx={{
                    fontSize: "1.2rem",
                    marginTop: "2%",
                  }}
                />
                {formik.touched.email && formik.errors.email && (
                  <Typography variant="caption" color="error">
                    {formik.errors.email}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12}>
                <FormControl>
                  <FormLabel id="demo-row-radio-buttons-group-label">
                    Role In System
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    value={formik.values.role}
                    onChange={(e) =>
                      formik.setFieldValue("role", e.target.value)
                    }
                    onBlur={formik.handleBlur}
                    sx={{
                      fontSize: "1.2rem",
                      marginTop: "2%",
                      justifyContent: "center",
                    }}
                  >

                    <FormControlLabel
                      value="customer"
                      control={<Radio />}
                      label="Customer"
                    />
                  </RadioGroup>
                  {formik.touched.role && formik.errors.role && (
                    <Typography variant="caption" color="error">
                      {formik.errors.role}
                    </Typography>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="password"
                  label="Password"
                  variant="standard"
                  type="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  sx={{
                    fontSize: "1.2rem",
                    marginTop: "2%",
                  }}
                />
                {formik.touched.password && formik.errors.password && (
                  <Typography variant="caption" color="error">
                    {formik.errors.password}
                  </Typography>
                )}
              </Grid>
            </Grid>
            <Button
              type="submit"
              sx={{
                marginTop: "5%",
                color: "black",
                border: "2px solid black",
                borderRadius: "20px",
                padding: "1%",
                width: "30%",
                fontSize: "1.2rem",
              }}
            >
              Submit
            </Button>
          </form>
          <a href="/">
            <Typography
              variant="h6"
              component="h1"
              gutterBottom
              sx={{
                marginTop: "5%",
              }}
            >
              Sign In
            </Typography>
          </a>
          <Typography variant="subtitle1">Copyright @TourMe(Web)</Typography>
        </Box>
      )}
    </div>
  );
}

export default SignUp;
