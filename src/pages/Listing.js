import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebase.config";
import { getAuth } from "firebase/auth";
import { useNavigate, Link, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import SwipeCore, { EffectCoverflow, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import KhaltiCheckout from "khalti-checkout-web";

import config from "../khalti/khaltiConfig";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import "../styles/listing.css";
import {
  FaBed,
  FaBath,
  FaParking,
  FaArrowCircleRight,
} from "react-icons/fa";
import {GiWaterDrop} from "react-icons/gi"
import { ImLocation2 } from "react-icons/im";
import {AiOutlineDollarCircle} from "react-icons/ai"
import {MdOutlineCallMade} from "react-icons/md"

//config
SwipeCore.use([EffectCoverflow, Pagination]);

const Listing = () => {
  const [listing, setListing] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  const auth = getAuth();

  useEffect(() => {
    const fetchListing = async () => {
      const docRef = doc(db, "listings", params.listingId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log(docSnap.data());
        setListing(docSnap.data());
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);

  if (loading) {
    return <Spinner />;
  }
  function buyPackage(){
    let checkout = new KhaltiCheckout(config);
    checkout.show({amount: `${(listing.regularPrice)}`});
}

  return (
    <Layout title={listing.name}>
      <div className="row listing-container">
        <div className="col-md-8 listing-container-col1">
          {listing.imgUrls === undefined ? (
            <Spinner />
          ) : (
            <Swiper
              effect={"coverflow"}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={1}
              coverflowEffect={{
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
              }}
              pagination={true}
              className="mySwipe"
            >
                {listing.imgUrls.map((url, index) => (
                <SwiperSlide key={index}>
                  <img src={listing.imgUrls[index]} alt={listing.name} />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
        <div className="col-md-4 listing-container-col2">
          <h3>{listing.name}</h3>
          <h6>
            Price :{" "}
            {listing.offer ? listing.discountedPrice : listing.regularPrice} Rs.
          </h6>
          <p><ImLocation2/> {listing.address}</p>
          <p>Property For : {listing.type === "rent" ? "Rent" : "Sale"}</p>
          <p>
            {listing.offer && (
              <span>
                {listing.regularPrice - listing.discountedPrice} Discount
              </span>
            )}
          </p>
          <p>
            <FaBed size={20} /> &nbsp;
            {listing.bedrooms > 1
              ? `${listing.bedrooms} Rooms`
              : "1 Room"}
          </p>
          <p>
            <FaBath size={20} /> &nbsp;
            {listing.bathrooms > 1
              ? `${listing.bathrooms} Bathrooms`
              : "1 Bathroom"}
          </p>
          <p>
            <FaParking size={20} /> &nbsp;
            {listing.parking ? `Parking spot` : "No spot for parking"}
          </p>
          <p>
            <GiWaterDrop size={20} /> &nbsp;
            {listing.furnished ? `Drinking Water Available` : "No Drinking Water Available"}
            </p>
          <Link
            className="btn btn-success mb-2"
            to={`/contact/${listing.useRef}?listingName=${listing.name}`}
          >
            Contact Landlord <MdOutlineCallMade size={20} />
          </Link>
          <button type="button" className="btn btn-primary" onClick={buyPackage}>Pay Now <AiOutlineDollarCircle size={20} /></button>
        </div>
      </div>
    </Layout>
  );
};
/**
 *  <Link
            className="btn btn-primary"
            to={`/contact/${listing.useRef}?listingName=${listing.name}`}
          >
            Pay Now <AiOutlineDollarCircle size={20} />
          </Link>
 */

export default Listing;