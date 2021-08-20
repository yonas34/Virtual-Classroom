import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import CustomerListResults from '../components/customer/CustomerListResults';
import CustomerListToolbar from '../components/customer/CustomerListToolbar';
import customers from '../__mocks__/customers';
import {custom} from '../components/customer/custom';
import React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { useTheme } from '@material-ui/styles';
import { ThemeProvider } from '@material-ui/styles';
import Tabeling_users from '../components/customer/Tableing_users';

const CustomerList = () => {
  const theme=useTheme();
return (
  
  <div>
    <Helmet>
      <title>Customers | Material Kit</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
        <CustomerListToolbar />
        <Box sx={{ pt: 3 }}>
          {/* { <CustomerListResults customers={customers} /> } */}
<Tabeling_users/> 
        </Box>
      </Container>
    </Box>
  </div>
)};

export default CustomerList;
