import React, { useState, useMemo } from "react";
import { useQuery } from "react-query";
import { MaterialReactTable, useMaterialReactTable } from "material-react-table";
import IconButton from "@mui/material/IconButton";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Button from "@mui/material/Button";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { getSouvenierOrdersByUseremail, updateSouvenierOrder } from "../../../Api/services/souvenierService";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setidAction } from "../../../Redux/idcapture/idcaptureAction";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { ToastContainer, toast } from "react-toastify";
import Chip from '@mui/material/Chip';
import dayjs from "dayjs"; // Import dayjs for date handling

function ViewSouvenierOrder() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [opendialog, setOpenDialog] = useState(false);
  const [id, setid] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedUser = useSelector((state) => state.auth.loggedUser);
  const darkmode = useSelector((state) => state.darkmode.darkmode);

  const { data } = useQuery({
    queryFn: () => getSouvenierOrdersByUseremail(loggedUser?.email),
  });

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleClickOpen = (id) => {
    setid(id);
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const filteredData = data || [];

  const filteredResults = useMemo(() => {
    if (!selectedDate) return filteredData;

    const formattedSelectedDate = dayjs(selectedDate).format("DD/MM/YYYY");

    return filteredData.filter((item) => {
      const itemDate = dayjs(item.date, "DD/MM/YYYY").format("DD/MM/YYYY");
      return itemDate === formattedSelectedDate;
    });
  }, [filteredData, selectedDate]);

  const handleDarkmode = () => {
    return darkmode ? "white" : "black";
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "InvoiceNo",
        header: "Invoice No",
        size: 150,
      },
      {
        accessorKey: "productname",
        header: "Product Name",
        size: 150,
      },
      {
        accessorKey: "total",
        header: "Total Quantity",
        size: 200,
      },
      {
        accessorKey: "state",
        header: "Status",
        size: 150,
        Cell: ({ row }) => (
          <div>
            {row.original.state === "pending" && (
              <Chip
                label="Pending"
                sx={{
                  backgroundColor: "orange",
                  color: "white",
                }}
              />
            )}
            {row.original.state === "cancelled" && (
              <Chip
                label="Cancelled"
                sx={{
                  backgroundColor: "red",
                  color: "white",
                }}
              />
            )}
            {row.original.state === "delivering" && (
              <Chip
                label="Delivering"
                sx={{
                  backgroundColor: "blue",
                  color: "white",
                }}
              />
            )}
            {row.original.state === "delivered" && (
              <Chip
                label="Delivered"
                sx={{
                  backgroundColor: "green",
                  color: "white",
                }}
              />
            )}
          </div>
        ),
      },
      {
        accessorKey: "date",
        header: "Date",
        size: 150,
      },
      {
        accessorKey: "actions",
        header: "Actions",
        size: 150,
        Cell: ({ row }) => (
          <div>
            <IconButton
              onClick={() => handleView(row)}
              sx={{
                margin: "5px",
                padding: "8px",
              }}
            >
              <RemoveRedEyeIcon />
            </IconButton>
            {row?.original?.state === "pending" ? (
              <Button
                onClick={() => handleClickOpen(row?.original?._id)}
                sx={{
                  backgroundColor: "red",
                  color: handleDarkmode(),
                  borderRadius: "20px",
                  margin: "5px",
                  padding: "8px",
                }}
              >
                Cancel
              </Button>
            ): null}
          </div>
        ),
      },
    ],
    []
  );

  const handleView = (row) => {
    dispatch(setidAction(row?.original?.souvenierid));
    navigate("/viewone/souvenier");
  };

  const handleCancel = () => {
    try {
      updateSouvenierOrder(id, "cancelled").then((res) => {
        toast.success("Order Cancelled Successfully");
        setOpenDialog(false);
        window.location.reload();
      });
    } catch (error) {
      toast.error("Error in Cancelling Order");
    }
  };

  const table = useMaterialReactTable({
    columns,
    data: filteredResults,
    enableColumnActions: false,
    muiTableContainerProps: {
      style: {
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        backdropFilter: "blur(10px)",
      },
    },
  });

  return (
    <div>
      <ToastContainer />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Filter by date"
          value={selectedDate}
          onChange={handleDateChange}
          sx={{
            color: handleDarkmode(),
            margin: "20px",
            padding: "10px",
            fontSize: "10px",
            borderRadius: "20px",
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            backdropFilter: "blur(10px)",
            "& input, & label": {
              color: handleDarkmode(),
            },
          }}
        />
      </LocalizationProvider>
      <MaterialReactTable table={table} />;
      <Dialog
        open={opendialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          backdropFilter: "blur(10px)",
        }}
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirm Your Order Cancellation?"}
        </DialogTitle>
        <DialogActions
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            backdropFilter: "blur(10px)",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
            color: handleDarkmode(),
          }}
        >
          <Button
            sx={{
              backgroundColor: "red",
              color: handleDarkmode(),
              borderRadius: "20px",
              margin: "5px",
              padding: "8px",
            }}
            onClick={handleCancel}
          >
            Yes
          </Button>
          <Button
            onClick={handleClose}
            autoFocus
            sx={{
              backgroundColor: "green",
              color: handleDarkmode(),
              borderRadius: "20px",
              margin: "5px",
              padding: "8px",
            }}
          >
            No
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ViewSouvenierOrder;
