import { StyleSheet } from "react-native";





export const style= StyleSheet.create({

    container:{
        

    },

    containerTitle:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',

        top: -185,
       
    },

 

    topo:{
        top: -150,
        width:395,
        height:365,
    
    },

    text:{
        padding: 20,
        fontSize: 40,
        top: -299,
        color: 'white',
        fontFamily:'Baloo-Bhaina',
        fontWeight:'bold',
        left: 60
  
    },

    
    title:{
        fontSize: 25,

    },
    containerButtonWithPersonal:{
        backgroundColor: '#4DA953',        
        borderRadius: 15,
        height: 27,
        width: 175,
        left: 20,
       
    },
    textButtonWithPersonal:{
        color: 'white',
        alignItems: 'center',
        fontSize: 18,
        textAlign: 'center',
        
    },

    textButtonWithoutPersonal:{
        color: 'white',
        alignItems: 'center',
        fontSize: 18,
        textAlign: 'center',
        
    },

    containerButton:{
        left: -19,
        padding: 5,
        flexDirection: 'row',
        justifyContent: 'space-between'
    }

   
  

})