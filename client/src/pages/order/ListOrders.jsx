import React, { useEffect } from "react";

import AccessPage from "../../components/access/AccessPage";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import allActions from "../../store/actions/index";
import { useDispatch, useSelector } from "react-redux";
import { MDBDataTable } from "mdbreact";
import Loader from "../../components/loader/Loader";
import { Link } from "react-router-dom";

const ListOrders = () => {
  const { myOrders, loading } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(allActions.orderAcs.getMyOrders());
  }, [dispatch]);

  const setOrders = () => {
    const data = {
      columns: [
        {
          label: "Order ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Num of Items",
          field: "numOfItems",
          sort: "asc",
        },
        {
          label: "Amount",
          field: "amount",
          sort: "asc",
        },
        {
          label: "Status",
          field: "status",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
          sort: "asc",
        },
      ],
      rows: [],
    };

    myOrders.forEach((order) => {
      data.rows.push({
        id: order._id,
        numOfItems: order.orderItems.length,
        amount: `$${order.totalPrice}`,
        status:
          order.orderStatus &&
          String(order.orderStatus).includes("Delivered") ? (
            <p style={{ color: "green" }}>{order.orderStatus}</p>
          ) : (
            <p style={{ color: "red" }}>{order.orderStatus}</p>
          ),
        actions: (
          <Link to={`/order/${order._id}`} className="btn btn-primary">
            <i className="fa fa-eye"></i>
          </Link>
        ),
      });
    });

    return data;
  };

  return (
    <AccessPage roles={["user", "admin"]}>
      <Header />
      <div className="contaier">
        <div className="row">
          <div className="col-lg-12 mx-auto">
            <h1 className="my-5 mx-4">My Orders</h1>
            {loading ? (
              <Loader />
            ) : (
              <MDBDataTable
                data={setOrders()}
                className="px-3"
                bordered
                striped
                hover
              />
            )}
          </div>
        </div>
      </div>
      <Footer />
    </AccessPage>
  );
};

export default ListOrders;
