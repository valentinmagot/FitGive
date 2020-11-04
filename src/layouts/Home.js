import React from "react";
import { Link, Router } from "react-router-dom";

// core components
import Button from "components/CustomButtons/Button.js";

export default function Home() {
  return (
    <div>
      <Link to='/admin/dashboard' >
        <Button>Log In</Button>
      </Link>
    </div>
  );
}
