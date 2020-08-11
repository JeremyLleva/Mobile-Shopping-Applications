/** @format */
import React from 'react'
import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer'
import { Platform, SafeAreaView, Button, View } from 'react-native'
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen'
import ProductDetailScreen from '../screens/shop/ProductDetailScreen'
import CartScreen from '../screens/shop/CartScreen'
import OrdersScreen from '../screens/shop/OrdersScreen'
import UserProductsScreen from '../screens/user/UserProductsScreen'
import EditProductsScreen from '../screens/user/EditProductsScreen'
import AuthScreen from '../screens/user/AuthScreen'
import StartupScreen from '../screens/StartupScreen'

import * as authActions from '../store/actions/auth'

import { useDispatch } from 'react-redux'

import Colors from '../constants/Colors'
import { Ionicons } from '@expo/vector-icons'

const defaultNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
    },
    headerTitleStyle: {
        fontFamily: 'open-sans-bold',
    },
    headerBackTitleStyle: {
        fontFamily: 'open-sans',
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
}

const ProductsNavigator = createStackNavigator(
    {
        ProductsOverview: ProductsOverviewScreen,
        ProductDetail: ProductDetailScreen,
        Cart: CartScreen,
    },
    {
        navigationOptions: {
            drawerIcon: (drawerConfig) => (
                <Ionicons
                    name='md-list'
                    size={23}
                    color={drawerConfig.intColor}
                />
            ),
        },
        defaultNavigationOptions: defaultNavOptions,
    }
)

const AdminNavigator = createStackNavigator(
    {
        UserProducts: UserProductsScreen,
        EditProduct: EditProductsScreen,
    },
    {
        navigationOptions: {
            drawerIcon: (drawerConfig) => (
                <Ionicons
                    name='md-create'
                    size={23}
                    color={drawerConfig.intColor}
                />
            ),
        },
        defaultNavigationOptions: defaultNavOptions,
    }
)

const OrdersNavigator = createStackNavigator(
    {
        Orders: OrdersScreen,
    },
    {
        navigationOptions: {
            drawerIcon: (drawerConfig) => (
                <Ionicons
                    name='md-cart'
                    size={23}
                    color={drawerConfig.intColor}
                />
            ),
        },
        defaultNavigationOptions: defaultNavOptions,
    }
)

const ShopNavigator = createDrawerNavigator(
    {
        Products: ProductsNavigator,
        Orders: OrdersNavigator,
        Admin: AdminNavigator,
    },
    {
        contentOptions: {
            activeTintColor: Colors.primary,
        },
        contentComponent: (props) => {
            const dispatch = useDispatch()
            return (
                <View style={{ flex: 1, paddingTop: 20 }}>
                    <SafeAreaView
                        forceInset={{ tope: 'always', horizontal: 'never' }}
                    >
                        <DrawerItems {...props} />
                        <Button
                            title='Logout'
                            color={Colors.primary}
                            onPress={() => {
                                dispatch(authActions.logout)
                            }}
                        />
                    </SafeAreaView>
                </View>
            )
        },
    }
)

const AuthNavigator = createStackNavigator(
    {
        Auth: AuthScreen,
    },
    {
        defaultNavigationOptions: defaultNavOptions,
    }
)

const MainNavigator = createSwitchNavigator({
    Startup: StartupScreen,
    Auth: AuthNavigator,
    Shop: ShopNavigator,
})

export default createAppContainer(MainNavigator)
