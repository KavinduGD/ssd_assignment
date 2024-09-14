import { useTicketContext } from "../../hooks/useTicketContext";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { useUsersContext } from "../../hooks/useUsersContext";
import dayjs from "dayjs";

function TicketsPage() {
  const { tickets } = useTicketContext();
  const { users } = useUsersContext();
  const columns = [
    {
      field: "ticketId",
      headerName: "SID",
      width: 90,
      flex: 0.3,
      align: "center",
      headerAlign: "center",
      type: "string",
    },
    {
      field: "userId",
      headerName: "Owner Photo",
      width: 90,
      flex: 0.25,
      align: "center",
      headerAlign: "center",
      type: "string",
      renderCell: (params) => (
        <div className="flex w-full items-center justify-center">
          <img
            src={
              users.find((user) => user._id === params.row.userId)
                ? users.find((user) => user._id === params.row.userId).photo
                : "https://res.cloudinary.com/dnoobzfxo/image/upload/v1698320073/360_F_64675209_7ve2XQANuzuHjMZXP3aIYIpsDKEbF5dD_g5ncwh.jpg"
            }
            alt="user"
            className="w-full h-[72px] object-contain"
          />
        </div>
      ),
    },
    {
      field: "name",
      headerName: "Owner",
      width: 90,
      flex: 0.5,
      align: "center",
      headerAlign: "center",
      type: "string",
      renderCell: (params) => (
        <div className="flex w-full items-center justify-center">
          {users.find((user) => user._id === params.row.userId)
            ? users.find((user) => user._id === params.row.userId).shortName
            : "Loading"}
        </div>
      ),
    },
    {
      field: "date",
      headerName: "Date Name",
      width: 90,
      flex: 0.4,
      align: "center",
      headerAlign: "center",

      renderCell: (params) => (
        <>{dayjs(params.row.date).format("DD-MM-YYYY")}</>
      ),
    },
    {
      field: "station",
      headerName: "Station",
      width: 90,
      flex: 0.5,
      align: "center",
      headerAlign: "center",
      type: "string",
    },
    {
      field: "total",
      headerName: "Total",
      width: 90,
      flex: 0.35,
      align: "center",
      headerAlign: "center",
      type: "string",
      renderCell: (params) => <>GBP.{params.row.total}.00</>,
    },

    {
      field: "seatCount",
      headerName: "Seat Count",
      sortable: false,
      flex: 0.2,
      align: "center",
      headerAlign: "center",
    },
  ];
  return (
    <div className="lg:mx-[30px] px-[15px] mb-[60px] xsm:mt-[5px] mt-[20px]">
      <p className="text-main_blue xsm:text-[37px] text-[30px] font-semibold font-barlows  mb-[15px] leading-6">
        Ticket Details
      </p>
      <div className="overflow-x-scroll">
        <div className="md:w-full w-[1000px]">
          <Box sx={{ height: "100%", width: "100%" }}>
            <DataGrid
              rows={tickets}
              columns={columns}
              rowHeight={85}
              getRowId={(row) => row._id}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 6,
                  },
                },
              }}
              slots={{
                toolbar: GridToolbar,
                //pagination: CustomPagination,
              }}
              //showColumnVerticalBorder={true}
              showCellVerticalBorder={true}
              sx={{
                "& .MuiDataGrid-columnHeaders": {
                  fontFamily: "Barlow Semi Condensed",
                  fontSize: "18px",
                  fontWeight: "400",
                  backgroundColor: "#002147",
                  color: "#fff",
                  // border: "none",
                },
                "& .MuiDataGrid-virtualScroller": {
                  backgroundColor: "#fff",
                  color: "#000",
                  fontFamily: "roboto",
                  fontSize: "12px",
                  fontWeight: "400",
                },
                // "& .MuiDataGrid-footerContainer": {
                //   backgroundColor: "#fff",
                //   paddingRight: "45%",
                // },
                "& .MuiDataGrid-toolbarContainer": {
                  backgroundColor: "#fff",
                  //center the toolbar
                  //paddingLeft: "10%",

                  "& .MuiButton-text": {
                    color: "#002147",
                  },
                },
                //remove cell horizontal border
                "& .MuiDataGrid-cell": {
                  //borderBottom: "none",
                },
              }}
            />
          </Box>
        </div>
      </div>
    </div>
  );
}

export default TicketsPage;
