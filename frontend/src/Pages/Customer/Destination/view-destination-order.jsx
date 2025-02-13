import React, { useState, useMemo } from "react";
import { useQuery } from "react-query";
import { MaterialReactTable, useMaterialReactTable } from "material-react-table";
import IconButton from "@mui/material/IconButton";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CircularProgress from "@mui/material/CircularProgress";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setidAction } from "../../../Redux/idcapture/idcaptureAction";
import { ToastContainer } from "react-toastify";
import { getDestinationOrdersByUseremail } from "../../../Api/services/destinationService";
import dayjs from "dayjs"; // Import dayjs for date handling

function ViewDestinationOrder() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [progress, setProgress] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedUser = useSelector((state) => state.auth.loggedUser);
  const darkmode = useSelector((state) => state.darkmode.darkmode);

  const { data, isLoading } = useQuery({
    queryFn: () => getDestinationOrdersByUseremail(loggedUser?.email),
  });

  const handleDateChange = (date) => {
    setSelectedDate(date);
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
        header: "Total Tickets",
        size: 200,
      },
      {
        accessorKey: "status",
        header: "Status",
        size: 150,
      },
      {
        accessorKey: "date",
        header: "Date",
        size: 150,
      },
      {
        accessorKey: "actions",
        header: "View",
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
          </div>
        ),
      },
    ],
    []
  );

  const handleView = (row) => {
    dispatch(setidAction(row?.original?.destinationid));
    navigate("/viewone/destination");
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
      {isLoading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress variant="determinate" value={progress} />
        </div>
      )}
      <MaterialReactTable table={table} />
    </div>
  );
}

export default ViewDestinationOrder;
