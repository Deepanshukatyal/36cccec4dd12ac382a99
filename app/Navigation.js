import {createStackNavigator} from 'react-navigation-stack'
import {createAppContainer} from 'react-navigation'
import HomeScreen from '../Features/HomeScreen'
import DetailScreen from '../Features/DetailScreen'

const AppStack=createStackNavigator({
    Home:HomeScreen,
    Detail:DetailScreen},
    {
})

const AppContainer=createAppContainer(AppStack)
export default AppContainer;