import React from "react";

export const tokenContext = React.createContext(null);
// const UserContext = React.createContext();

// export function useAuthState() {
//   const context = React.useContext(AuthStateContext);
//   if (context === undefined) {
//     throw new Error("useAuthState must be used within a AuthProvider");
//   }
//   return context;
// }

// export const UserProvider = ({ Children }) => {
//   // const { token } = React.useContext(AuthStateContext);
//   const token =
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDBkNGY5NGU5ZWM2NzQyMDRkOTNjMGIiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE2MTE5MzU2NzR9.5SiOhydip5ieAwTLYSFaemdiJ8hYn9yfa9agk29eZvQ";
//   const [user, setUser] = useState();
//   useEffect(() => {
//     axios
//       .get({
//         url: "http://localhost:3000/api/users/me",
//         headers: { "x-auth-token": token, "Content-type": "application/json" },
//       })
//       .catch((err) => console.log(err))
//       .then((res) => {
//         if (res) {
//           setUser(res.data);
//         }
//       });
//   }, []);

//   return (
//     <UserContext.Provider value={user}>
//       <button
//         onClick={() => {
//           console.log(user);
//         }}
//       ></button>
//       {Children}
//     </UserContext.Provider>
//   );
// };
