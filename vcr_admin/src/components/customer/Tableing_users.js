import React,{useEffect, useState} from 'react'
import { makeStyles, useTheme } from '@material-ui/styles'
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import {getRow,column} from './custom'
import { Dialog,DialogContent,DialogActions } from '@material-ui/core';
import axios  from 'axios';
import { Button, DialogTitle, Divider, Input, MenuItem, Select } from '@material-ui/core';
import { Save } from 'react-feather';
import { Add, Done } from '@material-ui/icons';
import Register from '../../pages/Register';


const useStyles=makeStyles((theme)=>({



    
    paper:{
        padding:theme.spacing(2),
        textAlign:'center',
        color:theme.palette.text.secondary,
    
    },
    img:{
        height:100,
        paddingTop:'56.25%',
        marginTop:'30',
        padding:theme.spacing(30)

    },
    card:{

marginTop:'50px',
width:'300%'


    },
    commentSection:{
        boxShadow:theme.shadows[14],
        color:'white',
        width:'300%'
    }

}))


const useToolbarStyles=makeStyles((theme)=>({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
      },
      highlight:
        theme.palette.type === 'light'
          ? {
              color: theme.palette.secondary.main,
              backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
          : {
              color: theme.palette.text.primary,
              backgroundColor: theme.palette.secondary.dark,
            },
      title: {
        flex: '1 1 100%',
      },


}));






function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  
  let rows =[]; 
  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
  
  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }
  
  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }
  
  const headCells =  [
    {id:'first_name',numeric:false,disablePadding:true,label:'First Name'},
    {id:'last_name',numeric:false,disablePadding:false,label:'Last Name'},
    {id:'email',numeric:false,disablePadding:false,label:'Email Address'},
    {id:'id',numeric:true,disablePadding:false,label:'UUID'},
    {id:'password',numeric:false,disablePadding:true,label:'PWD'},
    {id:'user_type',numeric:false,disablePadding:true,label:'User Type'}
    ];



 



  
  function EnhancedTableHead(props) {
    const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };
  
    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{ 'aria-label': 'select all desserts' }}
            />
          </TableCell>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? 'right' : 'left'}
              padding={headCell.disablePadding ? 'none' : 'normal'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <span className={classes.visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </span>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }
  
  EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
  };
  
  

  const EnhancedTableToolbar = (props) => {
    const classes = useToolbarStyles();
    const { numSelected } = props;
  
    return (
      <Toolbar
        className={clsx(classes.root, {
          [classes.highlight]: numSelected > 0,
        })}
      >
        {numSelected > 0 ? (
          <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
            Users List
          </Typography>
        )}
  
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton aria-label="filter list">
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
      </Toolbar>
    );
  };
  
  EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
  };
  
  const editedRow=new Set();


export default function Tabeling_users(){
  const [rows,setRow]=useState([]);
  useEffect(async() => {
    await axios.post("https://10.42.0.1:8000/get_all_users").then((data)=>{
setRow(data.data);
});
     
     
  }, [])
  
    const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
   const [register,setRegister]=React.useState(false);
   const [studentSelected,setStudentSelected]=useState([]);
   const [teacherSelected,setTeacherSelected]=useState([]);
  const handleAdd=async()=>{

    await axios.post("https://10.42.0.1:8000/get_all_users").then((data)=>{
      setRegister(!register); 
    setRow([...data.data]);
      });
      
           
  }
  const handleRegisterPop_up=()=>{

    setRegister(!register);
  }
  const handleSave=async()=>{
    let editedRows=[];
    console.log(editedRow);
editedRow.forEach((edited)=>{

editedRows.push(rows[edited]);
})
console.log(editedRows);
await axios.post("https://10.42.0.1:8000/update_users",editedRows).then((response)=>{
console.log(response.data);
setRow([...response.data.users])


});

  };
  const handleFirst_NameEditedRow=(event,id)=>{
    let tempRow=rows;
    let index=rows.map(row=>row._id).indexOf(id);
    editedRow.add(index);
    tempRow[index].first_name=event.target.value;
setRow([...tempRow]);



  }

  const handleLast_NameEditedRow=(event,id)=>{
    let tempRow=rows;
    let index=rows.map(row=>row._id).indexOf(id);
    editedRow.add(index);
    tempRow[index].last_name=event.target.value;
setRow([...tempRow]);
      }

      const handleEmail_NameEditedRow=(event,id)=>{
        let tempRow=rows;
        let index=rows.map(row=>row._id).indexOf(id);
        editedRow.add(index);
        tempRow[index].email=event.target.value;
    setRow([...tempRow]);
        
        
          }
    const handlePasswordEditedRow=()=>{
    
    
      
      
        }
  const handleUser_TypeEditedRow=(event,id)=>{
    let tempRow=rows;
    let index=rows.map(row=>row._id).indexOf(id);
    editedRow.add(index);
    tempRow[index].user_type=event.target.value;
setRow([...tempRow]);
    
      }
    const handleRequestSort = (event, property) => {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
    };
  
    const handleSelectAllClick = (event) => {
      if (event.target.checked) {
        const newSelecteds = rows.map((n) => n._id);
        setSelected(newSelecteds);
        return;
      }
      setSelected([]);
    };
  
   
    const handleClick = (event, name) => {
      const selectedIndex = selected.indexOf(name._id);
      let newSelected = [];
  



      if(name.user_type==='student')   
     {

      const studentIndex = studentSelected.indexOf(name._id);
 let studentNewSelected = [];
      if (studentIndex === -1) {
        studentNewSelected = studentNewSelected.concat(studentSelected, name._id);
      } else if (studentIndex === 0) {
        studentNewSelected = studentNewSelected.concat(studentSelected.slice(1));
      } else if (studentIndex === studentSelected.length - 1) {
        studentNewSelected = studentNewSelected.concat(studentSelected.slice(0, -1));
      } else if (studentIndex > 0) {
        studentNewSelected = studentNewSelected.concat(
          studentSelected.slice(0, studentIndex),
          studentSelected.slice(studentIndex + 1),
        );
      
      }
    
      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, name._id);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1),
        );}
        setSelected(newSelected);
    
        setStudentSelected(studentNewSelected);
      //  console.log('student: '+studentSelected);
    
    
    } 
      if(name.user_type==='lecturer')   
     {
      const lecturerIndex = studentSelected.indexOf(name._id);
let lecturerNewSelected=[];
        if (lecturerIndex === -1) {
        lecturerNewSelected = lecturerNewSelected.concat(teacherSelected, name._id);
      } else if (lecturerIndex === 0) {
        lecturerNewSelected = lecturerNewSelected.concat(teacherSelected.slice(1));
      } else if (lecturerIndex === teacherSelected.length - 1) {
        lecturerNewSelected = lecturerNewSelected.concat(teacherSelected.slice(0, -1));
      } else if (lecturerIndex > 0) {
        lecturerNewSelected = lecturerNewSelected.concat(
          teacherSelected.slice(0, lecturerIndex),
          teacherSelected.slice(lecturerIndex + 1),
        );
      }
      


      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, name._id);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1),
        );}
        setSelected(newSelected);
      setTeacherSelected(lecturerNewSelected)
    console.log('teacher: '+teacherSelected);
    }
  
  
     
      
    };
    console.log(studentSelected);
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };
  
    const handleChangeDense = (event) => {
      setDense(event.target.checked);
    };
  
const handleDelete=async()=>{

await axios.post("https://10.42.0.1:8000/delete",{user:selected,student:studentSelected,lecturer:teacherSelected}).then((response)=>{
console.log(response.data);
setRow([...response.data]);

});
}



    const isSelected = (name) => selected.indexOf(name) !== -1;
  
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
  
    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <EnhancedTableToolbar numSelected={selected.length} />
          <TableContainer>
            <Table
              className={classes.table}
              aria-labelledby="tableTitle"
              size={dense ? 'small' : 'medium'}
              aria-label="enhanced table"
            >
              <EnhancedTableHead
                classes={classes}
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />
              <TableBody>
                {stableSort(rows, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row._id);
                    const labelId = `enhanced-table-checkbox-${index}`;
  
                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, row)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row._id}
                        selected={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={isItemSelected}
                            inputProps={{ 'aria-labelledby': labelId }}
                          />
                        </TableCell>
                        <TableCell component="th" id={labelId} scope="row" padding="none">
                         
                         <Input id={row._id} onChange={(event)=>{handleFirst_NameEditedRow(event,row._id)}} value={row.first_name}/>
                        </TableCell>
                        <TableCell align="right"><Input id={row._id} onChange={(event)=>{handleLast_NameEditedRow(event,row._id)}} value={row.last_name}/> </TableCell>
                        
                        <TableCell align="right"><Input id={row._id} onChange={(event)=>{handleEmail_NameEditedRow(event)}} value={row.email}/></TableCell>
                        
                        <TableCell align="right">{row._id}</TableCell>
                        
                        <TableCell align="right"><Input id={row._id} onChange={(event)=>{handlePasswordEditedRow(event)}} value={row.password}/></TableCell>
                        
                        <TableCell align="right">
                        <Select  onChange={(event)=>handleUser_TypeEditedRow(event,row._id)} name='userType' labelId="user_type_lable" id="select_user_type" value={
                        row.user_type} >
                  <MenuItem name="menu" id="select_user_type"  onSelect={(event)=>handleUser_TypeEditedRow(event,row._id)} value="student">Student</MenuItem>
                  <MenuItem name="menu" id="select_user_type"  onSelect={(event)=>handleUser_TypeEditedRow(event,row._id)} value="lecturer">Lecturer</MenuItem>
                  <MenuItem name="menu" id="select_user_type"  onSelect={(event)=>handleUser_TypeEditedRow(event,row._id)} value="admin">Adminstrator</MenuItem>


                </Select>
                        
                        
                        
                        </TableCell>

                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
        <FormControlLabel
          control={<Switch checked={dense} onChange={handleChangeDense} />
 
        }
          label="Dense padding"
        />
        <FormControlLabel
        control={<Button onClick={()=>handleSave()}><Save/></Button>}
        label="SAVE"/>

{console.log(selected.length>0)}
<FormControlLabel

        control={<Button onClick={()=>handleDelete()} disabled={!(selected.length>0)}><DeleteIcon/></Button>}
        label="DELETE"/>
        <FormControlLabel
        control={<Button onClick={()=>handleRegisterPop_up()}><Add/></Button>}
        label="ADD"/>
      <Dialog open={register}>
<DialogContent>
<DialogTitle>
<Typography>Enter User Detail</Typography>
</DialogTitle>
<Register popUp={true} onRegistered={handleAdd}/>
</DialogContent>
<Divider/>

</Dialog>



      </div>
      
    );


}