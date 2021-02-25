import { useState, useRef, useEffect } from "react";
import BlogServices from "../services/BlogServices";

import { useHistory, Route, Switch, NavLink, Link } from "react-router-dom";
import axios from "axios";

const DeleteButton = ({ onDelete }) => {
    return ( 
        <button onClick={onDelete}>Delete Button</button>
     );
}
 
export default DeleteButton;