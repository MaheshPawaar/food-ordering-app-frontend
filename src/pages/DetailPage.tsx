import { useGetRestaurant } from '@/api/RestaurantApi';
import MenuItemCard from '@/components/MenuItemCard';
import OrderSummary from '@/components/OrderSummary';
import RestaurantInfo from '@/components/RestaurantInfo';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Card } from '@/components/ui/card';
import { MenuItem } from '@/types';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

export type CartItem = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
};

const DetailPage = () => {
  const { restaurantId } = useParams();
  const { restaurant, isLoading } = useGetRestaurant(restaurantId);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (menuItem: MenuItem) => [
    setCartItems((prevCartItems) => {
      // Check if the item is already in the cart
      const existingCartItem = prevCartItems.find(
        (cartItem) => cartItem._id === menuItem._id
      );

      let updatedCartItems;

      // If the item is already in the cart, increment the quantity
      if (existingCartItem) {
        updatedCartItems = prevCartItems.map((cartItem) =>
          cartItem._id === menuItem._id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        // If the item is not in the cart, add it to the cart
        updatedCartItems = [
          ...prevCartItems,
          {
            _id: menuItem._id,
            name: menuItem.name,
            price: menuItem.price,
            quantity: 1,
          },
        ];
      }
      return updatedCartItems;
    }),
  ];

  if (isLoading || !restaurant) {
    return 'Loading...';
  }

  return (
    <div className="flex flex-col gap-10">
      <AspectRatio ratio={16 / 5}>
        <img
          src={restaurant.imageUrl}
          className="rounded-md object-cover h-full w-full"
        />
      </AspectRatio>
      <div className="grid md:grid-cols-[4fr_2fr] gap-5 md:px-32">
        <div className="flex flex-col gap-4">
          <RestaurantInfo restaurant={restaurant} />
          <span className="text-2xl font-bold tracking-tight">Menu</span>
          {restaurant.menuItems.map((menuItem) => (
            <MenuItemCard menuItem={menuItem} addToCart={()=>addToCart(menuItem)}/>
          ))}
        </div>
        <div>
          <Card>
            <OrderSummary restaurant={restaurant} cartItems={cartItems} />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
