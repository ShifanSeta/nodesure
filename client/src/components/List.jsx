import { useEffect, useState } from 'react';
import Api from "../API/api";
import { DataGrid } from '@mui/x-data-grid';

const List = () => {
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'imgUrl', headerName: 'Product Image', width: 130,
      renderCell: (params) => {
        return <img src={params.value} className='img-fluid' width={"50px"} />;
      }
    },
    { field: 'name', headerName: 'Product name', width: 130 },
    { field: 'price', headerName: 'Price', type: 'number', width: 90}
  ];
  const [rowSelectionModel, setRowSelectionModel] = useState([]);
  
  
  const [data, setData] = useState([]);
  const getData = () => {
    Api.getAllProducts().then((resp)=>{
      if (resp && resp.data) {
        let res = resp.data.filter((item, i) => item.id = i + 1);
        setData(res);
        let temp = localStorage.getItem(localStorage.getItem('_id'));
        temp = JSON.parse(temp);
        if(temp && temp.hasOwnProperty('_id') && temp._id === localStorage.getItem('_id')){
          setRowSelectionModel(temp.productsSelected);
        }
      }
    })
  }
  const updateSessionData = (newRowSelectionModel) => {
    let temp = localStorage.getItem(localStorage.getItem('_id'));
    temp = JSON.parse(temp);
    if(temp && temp.hasOwnProperty('_id')){
      temp.productsSelected = [...newRowSelectionModel]
      localStorage.setItem(localStorage.getItem('_id'), JSON.stringify(temp))

    }else{
      localStorage.setItem(localStorage.getItem('_id'), JSON.stringify({'_id':localStorage.getItem('_id'), productsSelected: newRowSelectionModel}))
    }
  }


  useEffect(()=>{
    getData();
  },[])
  
  return (
    <div className='container d-flex justify-content-center align-items-center mt-5'>
      {data ? 
      <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={data}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        onRowSelectionModelChange={(newRowSelectionModel) => {
          setRowSelectionModel(newRowSelectionModel);
          updateSessionData(newRowSelectionModel);
        }}
        rowSelectionModel={rowSelectionModel}
      /> </div>
      : ''}
    </div>
  )
}

export default List