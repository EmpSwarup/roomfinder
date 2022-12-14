import React, { useEffect, useState } from "react";
import Layout from "./../components/Layout/Layout";
import { useParams } from "react-router-dom";
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

const Category = () => {
  const [listing, setListing] = useState("");
  const [listingss,setListings] = useState([]);
  const [lastFetchListing, setLastFetchListing] = useState(null);
  const [searchTerm,setSearchTerm] = useState([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();

  //fetch listing
  useEffect(() => {
    const fetchListing = async () => {
      try {
        //refrence
        const listingsRef = collection(db, "listings");
        //query
        const q = query(
          listingsRef,
          where("type", "==", params.categoryName),
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
  }, [params.categoryName]);

//loadmore pagination func
const fetchLoadMoreListing = async () => {
  try {
    //refrence
    const listingsRef = collection(db, "listings");
    //query
    const q = query(
      listingsRef,
      where("type", "==", params.categoryName),
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

  return (
    <Layout title={params.categoryName === "rent"
    ? "Properties For Rent"
    : "Properties For Sale"}>
      
      <div className="mt-3 container-fluid">
      <div class="row height d-flex justify-content-center align-items-center">

<div class="col-md-8">
  <div class="search">
    <input type="text" class="form-control" placeholder="Search for rooms..." onChange={(e)=>setSearchTerm(e.target.value)} />
  </div>
</div>
</div>
        <h1>
          {params.categoryName === "rent"
            ? "Properties For Rent"
            : "Properties For Sale"}
        </h1>
        <div class="col-md-8">
</div>
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
              }).map((list) => (
                <ListingItem listing={list.data} id={list.id} key={list.id} />
              ))}
            </div>
          </>
        ) : (
          <p>No Listing For {params.categoryName} </p>
        )}
      </div>
      <div className="d-flex align-items-center justify-content-center mb-4 mt-4">
      {lastFetchListing && (
          <button
            className="btn btn-primary text-center"
            onClick={fetchLoadMoreListing}
          >
            Load more
          </button>
        )}
      </div>
    </Layout>
  );
};

export default Category;