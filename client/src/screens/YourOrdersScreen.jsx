import {
  TableContainer,
  Stack,
  Spinner,
  Alert,
  AlertIcon,
  AlertDescription,
  Th,
  Tbody,
  Tr,
  Thead,
  Button,
  ListItem,
  UnorderedList,
  Table,
  Td,
  AlertTitle,
  Wrap,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { getUserOrders } from "../redux/actions/userActions";
import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";

 //$$$ here how we find feedback from server and fill our data in client
  //steps
  //1-dispatch action of redux from component
  //2- update slice by feedback from server
  //3- from slice we update the component by <td> and map function

const YourOrdersScreen = () => {

  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const { loading, error, orders, userInfo } = user;
  const location = useLocation();

  useEffect(() => {
    if (userInfo) {
      dispatch(getUserOrders());
    }
  }, []);

  return userInfo ? (
    <>
      {loading ? (
        <Wrap
          justify="center"
          direction="column"
          align="center"
          mt="20px"
          minH="100vh"
        >
          <Stack direction="row" spacing={4}>
            <Spinner
              mt={20}
              thickness="2px"
              speed="0.65s"
              emptyColor="gray.200"
              color="orange.500"
              size="xl"
            />
          </Stack>
        </Wrap>
      ) : error ? (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>We are sorry!</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : (
        orders && (
          <TableContainer minHeight="100vh">
            <Table variant="striped">
              <Thead>
                <Tr>
                  <Th>Order Id</Th>
                  <Th>Order Date</Th>
                  <Th>Paid Total</Th>
                  <Th>Items</Th>
                  <Th>Print Receipt</Th>
                </Tr>
              </Thead>
              <Tbody>
                {orders.map((order) => (
                  <Tr key={order._id}>
                    <Td>{order._id}</Td>
                    <Td>{new Date(order.createdAt).toDateString()}</Td>
                    <Td>
                      ${order.totalPrice} via {order.paymentMethod}
                    </Td>
                    <Td>
                      {order.orderItems.map((item) => (
                        <UnorderedList key={item._id}>
                          <ListItem>
                            {item.qty} x {item.name} (${item.price} ech)
                          </ListItem>
                        </UnorderedList>
                      ))}
                    </Td>
                    <Td>
                      <Button variant="outline">Receipt</Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        )
      )}
    </>
  ) : (
    // CGPT 
    //replace={true}: 
    //This prop specifies whether the current route should be replaced in the navigation history.
    //  When set to true, it replaces the current route instead of pushing a new entry to the history.
    //   This can be useful to prevent the user from going back to the previous protected route after logging in.

    //////below line is important for navigation 
    <Navigate to="/login" replace={true} state={{ from: location }} />
  );
};

export default YourOrdersScreen;
