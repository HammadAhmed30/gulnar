"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useCart } from "../Context/CartContext";
import { useSnapshot } from "valtio";
import { state } from "../../../../store/store";
import { urlFor } from "@/sanity/lib/image";
import { client } from "@/sanity/lib/client";
import { useRouter } from "next/navigation";

export default function CheckoutForm() {
  const { cart, subtotal, emptyCart } = useCart();

  const { sale } = useSnapshot(state);
  console.log(cart);
  const shipping = 500;

  const [activeTab, setActiveTab] = useState("personal");
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);

  console.log(cart, "nigga cart");

  const arr = cart?.map((item) => ({
    name: item?.name,
    quantity: item?.quantity,
    amountoneitem: item?.onSale
      ? item?.price * ((100 - sale?.percentageOff) / 100)
      : item?.price,
  }));
  const router = useRouter();

  async function placeOrder() {
    try {
      const currentDate = new Date();

      // Extract day, month, and year
      const day = String(currentDate.getDate()).padStart(2, "0"); // Ensure two digits
      const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are zero-based
      const year = currentDate.getFullYear();


      // Format the date as dd-mm-yyyy
      const formattedDate = `${year}-${month}-${day}`;
      console.log(name, address, city, phoneNumber);

      if (name !== "" && address !== "" && city !== "" && phoneNumber !== "") {
        setMsg(null);
        setLoading(true);
        const order = await client.create({
          _type: "order", // Assuming you have an 'order' schema
          customerName: name,
          address,
          city,
          phoneNumber,
          date: formattedDate,
          status: false,
          items: arr,
        });

        setLoading(false);
        emptyCart();
        router.push("/order-placed");
        // console.log("done nigga")
      } else {
        setMsg("Please Fill All the Feilds");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container mx-auto p-4">
      <title>Checkout | Gulnar</title>
      {loading && (
        <div className="w-full h-full fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-[rgb(256,256,256,.5)]">
          <div className="w-[35px] h-[35px] rounded-full border-[5px] border-y-0 border-black animate-spin"></div>
        </div>
      )}
      <div className="lg:grid lg:grid-cols-3 lg:gap-8">
        <div className="lg:col-span-2">
          <Card className="mb-6 lg:mb-0">
            <CardHeader>
              <CardTitle className="text-2xl">Checkout</CardTitle>
              <CardDescription>
                Complete your purchase by filling out the information below.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsContent value="personal" className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">Name</Label>
                      <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        id="first-name"
                        placeholder="Name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">City</Label>
                      <Input
                        id="last-name"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="City"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="adress">Address</Label>
                    <Input
                      id="adress"
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Street no x House no y Muhala City"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="+92 000 0000000"
                    />
                  </div>
                  {msg !== null && (
                    <p className="text-[#F60000] mt-5 font-bold text-[15px] sm:text-[15px] dark:text-white">
                      {msg}
                    </p>
                  )}
                  <Button
                    disabled={cart?.length > 0 ? false : true}
                    className="mt-4 w-full"
                    onClick={() => {
                      placeOrder();
                    }}
                  >
                    Place the Order
                  </Button>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="max-h-[300px] overflow-y-auto pr-2">
                  {cart.map((product, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between mb-4"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="h-18 w-14 rounded-md bg-muted flex items-center justify-center overflow-hidden flex-shrink-0">
                          <img
                            src={urlFor(product?.images[0])}
                            alt={product?.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium">{product.name} </p>
                          <p className="text-[12px] text-muted-foreground">
                            Quantity: {product.quantity} Size: {product.size}
                          </p>
                        </div>
                      </div>
                      <p className="font-medium ">
                        PKR{" "}
                        {product?.onSale
                          ? product?.price *
                            ((100 - sale?.percentageOff) / 100) *
                            product?.quantity
                          : product?.price * item?.quantity}
                      </p>
                    </div>
                  ))}
                </div>
                <Separator />
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <p className="text-muted-foreground">Subtotal</p>
                    <p>PKR {subtotal}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-muted-foreground">Shipping</p>
                    <p>PKR {shipping}</p>
                  </div>
                </div>
                <Separator />
                <div className="flex justify-between font-medium">
                  <p>Total</p>
                  <p>PKR {subtotal + shipping}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
