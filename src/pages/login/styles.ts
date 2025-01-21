import { Dimensions, StyleSheet } from "react-native";
import { themas } from "../../global/themes";

export const style= StyleSheet.create({

    container:{
        flex:1,
         alignItems: 'center',
        justifyContent: 'center'

    },

    boxTop:{
        height: Dimensions.get('window').height/3,
        width: '100%',
        backgroundColor: '',
        alignItems: 'center',
        justifyContent:'center'



    },

    boxMid:{
        top:50,
        height: Dimensions.get('window').height/4,
        width: '100%',
        

    },

    boxButton:{
        height: Dimensions.get('window').height/3,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
        
        

    },

    logo:{
        top: 66,
        width:378,
        height:120
    },

    text:{
        padding: 15,
        fontSize: 40,
        top: 98
    },

    titleInput:{
        
        marginLeft: 5,
        marginTop: 21,
        top: 50,
        paddingHorizontal:164
              
    },
    boxInput:{
        width: 200,
        height: 38,
        borderWidth:1,
        borderRadius: 25,
        left: 95,
        top: 23,
        borderColor:'#68E58B'
    
    },

    button:{
        width: 200,
        height:50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 60,
        backgroundColor: '#68E58B',
        color:'#FFFFFF',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        
        elevation: 12,
    },

    buttonLogar:{
        color:'#ffffff',
        fontSize: 20,
        fontWeight: 'bold',
        
    

    }
      
    
})