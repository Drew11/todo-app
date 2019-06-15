import React from 'react';

 function NewTodos(
     {text,
      index,
      remove ,
      edit,
      setItemStatus,
      status
     }
 )
 {
        return <li
                key={text}
                data-index={index}
                className={'todo'}
        >
           <div className={"todo-check"}>
               <input
                   id={"check-"+index}
                   className="todo-check-box"
                   type="checkbox"
                   checked={status}
                   onChange={(event)=>setItemStatus(event,index)}
               />
                <label
                   htmlFor ={"check-"+index}
                />
           </div>
            <span className={"todo-text"}
                key={index}
                onDoubleClick={()=>edit(index)}
            > {text}</span>

            <button
                className={"todo-remove"}
                onClick={()=>remove(index)}
            >✕</button>
         </li>
 }

 export default NewTodos;