import { useEffect,useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import React from 'react';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Button,
  Collapse,
  Divider,
  Drawer,

  Hidden,
  List,
  Typography
} from '@material-ui/core';
import {
  AlertCircle as AlertCircleIcon,
  BarChart as BarChartIcon,
  Lock as LockIcon,
  Settings as SettingsIcon,
  ShoppingBag as ShoppingBagIcon,
  User as UserIcon,
  UserPlus as UserPlusIcon,
  Users as UsersIcon,Calendar as CalendarIcon,
  Activity as ActivityIcon,
  Plus,
  PlusSquare,
  Clock,
  Code,
  Home
} from 'react-feather';

import NavItem from './NavItem';
import MainNavItem from './MainNavItem'
import { Add, AdminPanelSettings, AdminPanelSettingsOutlined, CameraAltRounded, ContactsRounded, ExpandLess, ExpandMore, HomeOutlined, MailOutline, QrCode2Outlined, QrCodeScanner } from '@material-ui/icons';
const user = {
  avatar: '/static/images/avatars/avatar_6.png',
  jobTitle: 'Senior Developer',
  name: 'Katarina Smith'
};

const items = [
  {
    href: '/app/profile',
    icon: UserIcon,
    title: 'Profile'
  },
  {
    href: '/app/schedule',
    icon: UsersIcon,
    title: 'Schedules'
  },
  {
    href: '/app/user_management',
    icon: UsersIcon,
    title: 'User Management'
  },
  {
    href: '/app/class_management',
    icon: UserIcon,
    title: 'Class Management'
  },
  {
    href: '/app/Attendance',
    icon: Clock,
    title: 'Attendance'
  },
  {
    href: '/app/home',
    icon: Home,
    title: 'Home'
  },
  {
    href: '/login',
    icon: LockIcon,
    title: 'Login'
  },
  {
    href: '/register',
    icon: UserPlusIcon,
    title: 'Register'
  },
  {
    href: '/register_student',
    icon: UserPlusIcon,
    title: 'Register Student'
  },
  {
    href: '/register_lecturer',
    icon: UserPlusIcon,
    title: 'Register Student'
  },
  {
    href: '/register_class',
    icon: UserPlusIcon,
    title: 'Add Class'
  },
  {
    href: '/edit_classes',
    icon: UserPlusIcon,
    title: 'Edit Classes'
  },
  {
    href: '/404',
    icon: AlertCircleIcon,
    title: 'Error'
  }
];

const DashboardSidebar = ({ onMobileClose, openMobile }) => {
  const location = useLocation();
const [expandSchedule,setExpandSchedule]=useState(false);
const [expandProfile,setExpandProfile]=useState(false);
const[expandClass,setExpandClass]=useState(false);
const [expandUserManagement,setExpandUserManagement]=useState(false);
const [expandAttendance,setExpandAttendance]=useState(false);


const handleExpandUserManagement=()=>{

  setExpandUserManagement(!expandUserManagement)
}

const handleExpandProfile=()=>{

setExpandProfile(!expandProfile);
}
const handleExpandSchedule=()=>{

  setExpandSchedule(!expandSchedule);
  console.log(expandSchedule);
 
  }
  const handleClassExpand=()=>{

    setExpandClass(!expandClass);
  }
const handleExpandAttendance=()=>{

  setExpandAttendance(!expandAttendance);
}
  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);

  const content = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          p: 2
        }}
      >
        <Avatar
          component={RouterLink}
          src={user.avatar}
          sx={{
            cursor: 'pointer',
            width: 64,
            height: 64
          }}
          to="/app/profile/my_profile"
        />
        <Typography
          color="textSecondary"
          variant="h5"
        >
          {user.name}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body2"
        >
          {user.jobTitle}
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <List>
        <NavItem href={'/app/home'} key={'home'} title={'Home'} icon={HomeOutlined}/>
          <MainNavItem href={items[0].href} key={items[0].title} title={items[0].title} icon={UsersIcon} onClickHandler={handleExpandProfile}/>
          {expandProfile ?<ExpandLess/>:<ExpandMore/>}
          <Collapse in={expandProfile} timeout="auto" unmountOnExit>
         
         <NavItem href={'/app/profile/my_profile'} key={'My profile'} title={'My Profile'} icon={UserIcon}/>
         <NavItem href={'/app/profile/deans_profile'} key={'deans profile'} title={'Faculty Dean Profile'} icon={UserIcon}/>
         <NavItem href={'/app/profile/chairs_profile'} key={'chairs profile'} title={'Faculty Chairs Profile'} icon={UserIcon}/>
         <NavItem href={'/app/profile/lecturer_profile'} key={'lecturer profile'} title={'Faculty Lecturers profile'} icon={UserIcon}/>
          </Collapse>
          {/* {items.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))} */}
                    <MainNavItem href={items[1].href} key={items[1].title} title={items[1].title} icon={CalendarIcon} onClickHandler={handleExpandSchedule}/>
                    {expandSchedule ?<ExpandLess/>:<ExpandMore/>}
                    <Collapse in={expandSchedule} timeout="auto" unmountOnExit>
         
                  <NavItem href={'schedule/edit_schedule'} key={'edit schedule'} title={'Edit Schedule Table'} icon={UserIcon}/>
                  <NavItem href={'schedule/schedule_table'} key={'schedule table'} title={'View Schedule Table'} icon={UserIcon}/>
                  
          </Collapse>
          <MainNavItem href={items[2].href} key={items[2].title} title={items[2].title} icon={UserPlusIcon} onClickHandler={handleExpandUserManagement}/>
                    {expandUserManagement ?<ExpandLess/>:<ExpandMore/>}
                    <Collapse in={expandUserManagement} timeout="auto" unmountOnExit>
         
                  <NavItem href={'user_management/user_list'} key={'user list'} title={'Users List Table'} icon={UsersIcon}/>
                  <NavItem href={'user_management/create_new_user'} key={'create user'} title={'Create New User'} icon={UserPlusIcon}/>
                  
          </Collapse>


          <MainNavItem href={items[3].href} key={items[3].title} title={items[3].title} icon={AdminPanelSettingsOutlined} onClickHandler={handleClassExpand}/>
                    {expandClass ?<ExpandLess/>:<ExpandMore/>}
                    <Collapse in={expandClass} timeout="auto" unmountOnExit>
         
                  <NavItem href={'class_management/add_course'} key={'add course'} title={'Add Course'} icon={Plus}/>
                  <NavItem href={'class_management/add_class'} key={'add class'} title={'Create Class'} icon={PlusSquare}/>
                  
          </Collapse>



          <MainNavItem href={items[4].href} key={items[4].title} title={items[4].title} icon={items[4].icon} onClickHandler={handleExpandAttendance}/>
                    {expandAttendance ?<ExpandLess/>:<ExpandMore/>}
                    <Collapse in={expandAttendance} timeout="auto" unmountOnExit>
         
                  <NavItem href={'attendance/scan_qr'} key={'qr scan'} title={'Scan Attendance QR code'} icon={QrCodeScanner}/>
                  <NavItem href={'attendance/create_qr'} key={'create qr'} title={'Create Student QR Attendance'} icon={QrCode2Outlined}/>
                  
          </Collapse>
        


          <NavItem href={'/app/about'} key={'about'} title={'About'} icon={MailOutline}/>

        </List>
      </Box>
      <Box sx={{ flexGrow: 1 }} />
      <Box
        sx={{
          backgroundColor: 'background.default',
          m: 2,
          p: 2
        }}
      >
        <Typography
          align="center"
          gutterBottom
          variant="h4"
        >
          AMU
        </Typography>
        <Typography
          align="center"
          variant="body2"
        >
         Arba Minch Institute of Technology
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pt: 2
          }}
        >
          <Button
            color="primary"
            component="a"
            href="https://www.amu.edu.et"
            variant="contained"
          >
            Visit AMU
          </Button>
        </Box>
      </Box>
    </Box>
  );

  return (
    <div>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
          PaperProps={{
            sx: {
              width: 256
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden lgDown>
        <Drawer
          anchor="left"
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: 256,
              top: 64,
              height: 'calc(100% - 64px)'
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden>
     
    </div>
  );
};

DashboardSidebar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

DashboardSidebar.defaultProps = {
  onMobileClose: () => { },
  openMobile: false
};

export default DashboardSidebar;
