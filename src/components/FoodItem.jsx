import React from 'react';

export default function FoodItem({ food: { title } }) {
  return <li>{title}</li>;
}
