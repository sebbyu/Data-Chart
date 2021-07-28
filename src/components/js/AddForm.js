import './../scss/AddForm.scss';  
import LogoButton from './LogoButton';


export default function AddForm() {

  const handleClick = () => {
    console.log("Add");
  }

  const createForm = () => {
    return (
      <div>
        <LogoButton
          name="PLUS"
          clickHandler={handleClick}/>
        {addForm()}
      </div>
    )
  }

  const addForm = () => {
    return (
      <form>
        <input
          type="text"/>
        <input
          type="text"/>
        <LogoButton name="INSERT" clickHandler={handleClick}/>
      </form>
    )
  }
  


  // const createForm = () => {
  //   return (
  //     <div style={{display: props.currentPage === "COMPANY EXPENSES" ? 
  //     'none' : 'block'}}>
  //       <LogoButton
  //         name={adding ? "CANCEL" : "PLUS"} 
  //         clickHandler={() => setAdding(!adding)}/>
  //       {addForm()}
  //     </div>
  //   )
  // }

  // const addForm = () => {
  //   if (adding) {
  //     return (
  //       <div>
  //         <form>
  //           <input 
  //             type="text" name="first name" 
  //             value={newData['first name']}
  //             onChange={handleNewUser}/>
  //           <input type="text" name="last name" 
  //             value={newData['last name']}
  //             onChange={handleNewUser}/>
  //           <LogoButton name="INSERT" clickHandler={addData}/>
  //         </form>
  //       </div>
  //     )
  //   } 
  // }
  return (
    <div className="component-add_form">
      {createForm()}
    </div>
  )

}

  