import { toast } from "react-toastify";
import { useRoadRouteContext } from "../../hooks/useRoadRouteContext";
import JourneyMap from "./JourneyMap";
import Bus from "./component/Bus";
import { useState } from "react";
import { useParams } from "react-router-dom";
import userAxios from "../../baseURL";
import { useUserContext } from "../../hooks/useUserAuthContext";
import { useNavigate } from "react-router-dom";
import { useTicketContext } from "../../hooks/useTicketContext";

function Journey() {
  const { id } = useParams();
  const { user } = useUserContext();
  const navigate = useNavigate();

  const { dispatch } = useTicketContext();

  const { roadRoutes } = useRoadRouteContext();
  const [selectedStation, setSelectedStation] = useState("0");
  const [seatCount, setSeatCount] = useState(0);

  const [cardNumber, setCardNumber] = useState("");
  const [expire, setExpire] = useState("");
  const [cvv, setCvv] = useState("");

  const processPayment = async () => {
    if (selectedStation == "0") {
      toast.error("Select a station", {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }

    if (seatCount == 0) {
      toast.error("Select a seat", {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }

    if (cardNumber != "4242424242424242" || expire != "16/27" || cvv != "123") {
      toast.error("Invalid Payment Data", {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }

    try {
      const res = await userAxios.post(
        "/api/tickets/",
        {
          roadRouteId: id,
          seatCount: seatCount,
          station: selectedStation,
          total:
            roadRoutes != null && selectedStation != "0"
              ? roadRoutes
                  .find((route) => route._id == id)
                  .stations.find((station) => station.id == selectedStation)
                  .price * seatCount
              : "0",
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (res.status == 201) {
        toast.success("Payment Successfull", {
          position: "top-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        dispatch({ type: "ADD_TICKET", payload: res.data });
        navigate("/booking");
      }
    } catch (err) {
      toast.error(err.response.data.message, {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };
  return (
    <div className="md:px-[30px] mx-[20px] mt-[20px] mb-[90px]">
      <p className="text-main_blue text-[37px] font-semibold font-barlows  mb-[20px] leading-6">
        Choose your seat
      </p>

      <div className="flex  xl:justify-between gap-[20px] xl:flex-row flex-col ">
        {/* map */}
        <div className="xl:w-[500px] w-full xsm:h-[500px] h-[350px]">
          <JourneyMap
            googleRoutes={
              roadRoutes.find((route) => route._id == id).googleRoute
            }
            stations={roadRoutes.find((route) => route._id == id).stations}
            startLocation={
              roadRoutes.find((route) => route._id == id).startLocation
            }
          />
        </div>
        {/* bus and payment */}
        <div className="flex md:flex-row flex-col  flex-1 gap-[20px]">
          {/* bus */}
          <div className="">
            <Bus setSeatCount={setSeatCount} />
          </div>
          {/* payment */}
          <div className="flex-1  bg-[#f8f8f8]">
            <div className="">
              {/* payment header */}
              <div className="py-2 bg-main_blue text-center text-white font-semibold text-[18px]">
                Payment
              </div>
              {/* stations */}
              <div className="px-[20px] flex mt-[10px] mb-[10px] items-center justify-center ">
                <p className="font-roboto font-semibold text-[16px] text-[#383838] mt-[10px] ">
                  Select a Station :
                </p>
                <select
                  style={{ lineHeight: "normal" }}
                  className={`xsm:py-3 py-2 xsm:px-4  w-full rounded-md border-[1px] border-gray-300 text-basefont-normal focus:outline-none h-[53.6px] role-select ${
                    selectedStation
                      ? "text-[#000] md:text-[18px] font-semibold"
                      : "text-gray-400"
                  } `}
                  value={selectedStation}
                  onChange={(e) => setSelectedStation(e.target.value)}
                >
                  <option value="0" className="">
                    Select a station...
                  </option>
                  {roadRoutes
                    .find((route) => route._id == id)
                    .stations.map((station) => (
                      <option
                        key={`${station.id} ${station.lat} ${station.lng}`}
                        value={station.id}
                      >
                        {station.id}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            {/* seat count and distance */}
            <div className="px-[20px] font-roboto_slab ">
              <div className="flex gap-[20px] font-semibold text-[18px]">
                <p>Seat Count - </p>
                <p>{seatCount}</p>
              </div>

              <div className="flex gap-[20px] font-semibold text-[18px]">
                <p>Distance -</p>
                <p>
                  {roadRoutes != null && selectedStation != "0"
                    ? roadRoutes
                        .find((route) => route._id == id)
                        .stations.find(
                          (station) => station.id == selectedStation
                        ).distance
                    : "0"}
                </p>
              </div>
            </div>

            {/* line */}
            <div className="w-full h-[1px] bg-slate-600 mt-[5px]" />

            {/* total */}
            <div className="mt-[5px] px-[20px] ">
              <div className="flex font-semibold font-roboto_slab text-[24px] m">
                <p>Total-</p>
                <p>
                GBP .
                  {roadRoutes != null && selectedStation != "0"
                    ? roadRoutes
                        .find((route) => route._id == id)
                        .stations.find(
                          (station) => station.id == selectedStation
                        ).price * seatCount
                    : "0"}
                </p>
              </div>
            </div>
            {/* payment images adn inputs */}
            <div className="bottom px-[20px] mt-[10px] w-full">
              <div className="flex items-center justify-between w-full">
                <div className="w-full  ">
                  <img
                    className=""
                    src="https://res.cloudinary.com/dnoobzfxo/image/upload/v1701802268/Frame_1000001526_vodxmk.png"
                    alt=""
                  />
                </div>
                <div className="w-full">
                  <img
                    className="w-auto"
                    src="https://res.cloudinary.com/dnoobzfxo/image/upload/v1701802268/Frame_1000001528_acgdut.png"
                    alt=""
                  />
                </div>
                <div className="w-full ">
                  <img
                    className="full"
                    src="https://res.cloudinary.com/dnoobzfxo/image/upload/v1701802268/Frame_1000001527_fspdik.png"
                    alt=""
                  />
                </div>
              </div>
              <div className="inputs font-roboto">
                <div>
                  <p className="font-semibold text-gray-600">Card Number</p>
                  <input
                    type="text"
                    className="w-full pl-[10px] py-3 border-[1px] border-gray-300 rounded-lg focus:outline-none"
                    placeholder="1234 1234 1234 1234"
                    onChange={(e) => setCardNumber(e.target.value)}
                  />
                </div>
                <div className="flex gap-[20px]">
                  <div>
                    <p className="font-semibold text-gray-600">Expire</p>
                    <input
                      type="text"
                      className="w-full pl-[10px] py-3 border-[1px] border-gray-300 rounded-lg focus:outline-none"
                      placeholder="MM /YY"
                      onChange={(e) => setExpire(e.target.value)}
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-600">CVV</p>
                    <input
                      type="text"
                      className="w-full pl-[10px] py-3 border-[1px] border-gray-300 rounded-lg focus:outline-none"
                      placeholder="CVV"
                      onChange={(e) => setCvv(e.target.value)}
                    />
                  </div>
                </div>
                <button
                  onClick={processPayment}
                  className="w-full bg-main_blue flex items-center justify-center py-3 rounded-lg text-white text-[17px] font-medium mt-[10px]"
                >
                  Proceed
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Journey;
