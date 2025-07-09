import React from 'react'
import Spinner from '../UI/Spinner'

const shipmentAttributes = [
  'senderName',
  'receiverName',
  'packageWeight',
  'deliveryAddress',
  'shipmentDate',
  'DeliveryDate',
  'status',
];

const ShipmentList = (props) => {
  const { userData } = props;

  // Show spinner if no data
  if (!userData || userData.length === 0) {
    return (
      <div className='w-full h-full flex p-4 justify-evenly'>
        <div className='w-[95%]'>
          <h1 className=' text-3xl text-white w-full mb-5'>Your Shipment List!</h1>
          <ul className='w-full h-full border-2 rounded-sm'>
            <li id='details' className='text-white w-full grid grid-cols-7 justify-items-center border-b-2 mt-2 pb-2'>
              <span>Sender Name</span>
              <span>Receiver Name</span>
              <span>Package Weight</span>
              <span>delivery Address</span>
              <span>Shipment Date</span>
              <span>Expected Delivery Date</span>
              <span>Delivery Status</span>
            </li>
            <li className='w-full flex justify-center items-center' style={{ gridColumn: '1 / -1' }}>
              <Spinner />
            </li>
          </ul>
        </div>
      </div>
    );
  }

  // Render shipment list
  return (
    <div className='w-full h-full flex p-4 justify-evenly'>
      <div className='w-[95%]'>
        <h1 className=' text-3xl text-white w-full mb-5'>Your Shipment List!</h1>
        <ul className='w-full h-full border-2 rounded-sm'>
          <li id='details' className='text-white w-full grid grid-cols-7 justify-items-center border-b-2 mt-2 pb-2'>
            <span>Sender Name</span>
            <span>Receiver Name</span>
            <span>Package Weight</span>
            <span>delivery Address</span>
            <span>Shipment Date</span>
            <span>Expected Delivery Date</span>
            <span>Delivery Status</span>
          </li>
          {userData.slice().reverse().map((shipment, idx) => (
            <li
              key={idx}
              className='text-white w-full grid grid-cols-7 justify-items-center mt-2'
              style={{ color: 'white', width: 'full', display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', justifyItems: 'center', marginTop: '4px' }}
            >
              {shipmentAttributes.map((key) => (
                <span key={key}>{shipment[key]}</span>
              ))}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ShipmentList;
