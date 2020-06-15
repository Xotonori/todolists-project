import React from 'react';

class DeleteItem extends React.Component {
   render(){
       return (
           <div className="DeleteItem">
               <button onClick={this.props.deleteItem}>
                   X
               </button>
           </div>
       );
   }
}

export default DeleteItem;