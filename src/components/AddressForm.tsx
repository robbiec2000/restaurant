import { AddressElement } from "@stripe/react-stripe-js";

const AddressForm = () => {
  return (
    <form>
      <h3>Address</h3>
      <AddressElement 
      onChange={(event) => {
        if(event.complete){
            const address = event.value.address;
        }
      }}
      options={{ mode: "shipping" }}
       />
    </form>
  );
};

export default AddressForm;
