import React, { SFC } from "react";

interface IItemProps {
  name: string;
}

export const Item: SFC<IItemProps> = ({ name }) => {
  
  return <div>
    {name}
  </div>
}
