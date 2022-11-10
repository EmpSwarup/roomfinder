import React, { useEffect, useState } from "react";
import Layout from "./../components/Layout/Layout";
import { IoReloadCircle } from "react-icons/io5";
import "../styles/offers.css";
import { db } from "./../firebase.config";
import { toast } from "react-toastify";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";
import Spinner from "../components/Spinner";
import ListingItem from "../components/ListingItem";
import {FaSearch} from "react-icons/fa"

const Offers = () => {
  const [listing, setListing] = useState('');
  const [loading, setLoading] = useState(true);
  const [lastFetchListing, setLastFetchListing] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [listingss,setListings] = useState([]);

  //fetch listing
  useEffect(() => {
    const fetchListing = async () => {
      try {
        //refrence
        const listingsRef = collection(db, "listings");
        //query
        const q = query(
          listingsRef,
          where("offer", "==", true),
          orderBy("timestamp", "desc"),
          limit(10)
        );
        //execute query
        const querySnap = await getDocs(q);
        const lastVisible = querySnap.docs[querySnap.docs.length - 1];
        setLastFetchListing(lastVisible);
        const listings = [];
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setListing(listings);
        setListings(listings);
        setLoading(false);
      } catch (error) {
        console.log(error);
        toast.error("Unble to fetch data");
      }
    };
    //func call
    fetchListing();
  }, []);

//loadmore pagination func
const fetchLoadMoreListing = async () => {
  try {
    //refrence
    const listingsRef = collection(db, "listings");
    //query
    const q = query(
      listingsRef,
      where("offer", "==", true),
      orderBy("timestamp", "desc"),
      startAfter(lastFetchListing),
      limit(10)
    );
    //execute query
    const querySnap = await getDocs(q);
    const lastVisible = querySnap.docs[querySnap.docs.length - 1];
    setLastFetchListing(lastVisible);
    const listings = [];
    querySnap.forEach((doc) => {
      return listings.push({
        id: doc.id,
        data: doc.data(),
      });
    });
    setListing((prevState) => [...prevState, ...listings]);
    setLoading(false);
  } catch (error) {
    console.log(error);
    toast.error("Unble to fetch data");
  }
};

const renderFunction = (list)=>{
  return (
    <ListingItem listing={list.data} id={list.id} key={list.id} />
  )
}

return (
  <Layout title="Best Offers For Houses">
    <div className="offers pt-3 container-fluid">
    <div class="row height d-flex justify-content-center align-items-center">

<div class="col-md-8">
  <div class="search">
    <input type="text" class="form-control" placeholder="Search for rooms..." onChange={(e)=>setSearchTerm(e.target.value)} />
  </div>
</div>
</div>
    <div class="row height d-flex justify-content-center align-items-center">

<div class="col-md-8">
</div>
</div>
      <h1>
        {" "}
        <img
          src="/assets/offer.png"
          alt="offers"
          className="offer-img"
        />{" "}
        Best Offers
      </h1>
      {loading ? (
        <Spinner />
      ) : listing && listing.length > 0 ? (
        <>
          <div>
           
       
        {listingss.filter((post)=>{
                if(searchTerm == ""){
                  return post;
                }else if(post.data.address.toLowerCase().includes(searchTerm.toLowerCase())){
                  return post;
                }else if(post.data.name.toLowerCase().includes(searchTerm.toLowerCase())){
                  return post;
                }
        }).map(renderFunction)}
          </div>
        </>
      ) : (
        <p>There Are No Current Offers </p>
      )}
      
      
      <div className="d-flex align-items-center justify-content-center pb-4 mt-4">
        {lastFetchListing && (
          <button className="load-btn" onClick={fetchLoadMoreListing}>
            <IoReloadCircle /> Load More Listings
          </button>
        )}
      </div>
    </div>
  </Layout>
);
};

export default Offers;

/*
 {listing.map((list) => (
              <ListingItem listing={list.data} id={list.id} key={list.id} />
            ))}*/

            /*
              {listing.filter((list)=>{
      if(searchTerm == ""){
        return list;
      }else if(list.data.address.toLowerCase().includes(searchTerm.toLowerCase())){
         return list;
      }
    }).map((list)=>{
      <ListingItem listing={list.data} id={list.id} key={list.id} />
    })}*/