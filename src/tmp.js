function merge(ar1,ar2){
    let ar3=[];//resultant array 
    for(let i=0;i<ar1.length;i++){   
        //Creating a new object with the required properties
        tmp={
            uuid:ar1[i].uuid,
            name:ar1[i].name,
            role:null//role is null because it is a NON-EXISTING property in ar1
        }
        ar3.push(tmp);//pushing the new object to the resultant array
    }
    for(let i=0;i<ar2.length;i++){
        //Creating a new object with the required properties
        tmp={
            uuid:ar2[i].uuid,
            name:null,//name is null because it is a NON-EXISTING property in ar2
            role:ar2[i].role
        }
        ar3.push(tmp);//pushing the new object to the resultant array
    }
    ar3.sort((a,b)=>{//sorting the resultant array based on uuid
        return a.uuid-b.uuid
    });Z
    return ar3;//returning the resultant array
}

//main function
let ar1=[{uuid:'5',name:'Joe'},{uuid:'9',name:'Ron'},{uuid:'3',name:'Paul'}];//array with uuid and name
let ar2=[{uuid:'4',role:'admin'},{uuid:'1',role:'supervisor'},{uuid:'6',role:'HR'}];//array with uuid and role
let ans=merge(ar1,ar2);//merge function to merge the two array of objects
console.log(ans);