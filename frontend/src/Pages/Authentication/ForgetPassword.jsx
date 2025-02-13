import { useState } from "react";
import { Box, Typography, TextField, Grid, Button } from "@mui/material";
import { forgotPassword } from "../../Api/services/authService";
import { ToastContainer, toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [secretcode, setSecretCode] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!email && !newpassword && !secretcode) {
        toast.error("Please fill all the fields");
        return;
      }
      setLoading(true);
      const res = await forgotPassword(email, secretcode, newpassword);
      if (res.error) {
        toast.error("Sorry Your Data Verification Is Failed");
        setLoading(false);
      }
      setLoading(false);
      toast.success("Password Changed Successfully");
      setEmail("");
      setNewPassword("");
      setSecretCode("");
      navigate("/");
    } catch (err) {
      setLoading(false);
      toast.error("Sorry Your Data Verification Is Failed");
    }
  };

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
            Forgot Password
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                id="email"
                label="Email"
                defaultValue="Email"
                variant="standard"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{
                  fontSize: "1.2rem",
                  marginTop: "2%",
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                id="secretcode"
                label="Secret Code"
                defaultValue="Secret Code"
                variant="standard"
                value={secretcode}
                onChange={(e) => {
                  const inputValue = e.target.value;
                  if (/^\d{0,4}$/.test(inputValue)) {
                    setSecretCode(inputValue);
                  }
                }}
                sx={{
                  fontSize: "1.2rem",
                  marginTop: "2%",
                }}
                InputProps={{
                  inputProps: {
                    inputMode: "numeric",
                    pattern: "\\d{4}",
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                id="newpassword"
                label="New Password"
                defaultValue="New Password"
                variant="standard"
                value={newpassword}
                onChange={(e) => setNewPassword(e.target.value)}
                sx={{
                  fontSize: "1.2rem",
                  marginTop: "2%",
                }}
              />
            </Grid>
          </Grid>
          <Button
            sx={{
              marginTop: "5%",
              color: "black",
              border: "2px solid black",
              borderRadius: "20px",
              padding: "1%",
              width: "30%",
              fontSize: "1.2rem",
            }}
            onClick={onSubmit}
          >
            Submit
          </Button>

          <a href="/">
            <Typography
              variant="h6"
              component="h1"
              gutterBottom
              sx={{
                marginTop: "5%",
              }}
            >
              Back
            </Typography>
          </a>
          <Typography variant="subtitle1">Copyright @TourMe(Web)</Typography>
        </Box>
      )}
    </div>
  );
}

export default ForgetPassword;
