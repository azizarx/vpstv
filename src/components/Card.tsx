import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useSearchParams } from 'react-router-dom';


export function ShowCard() {
    const [searchParams, setSearchParams] = useSearchParams();
    const name = searchParams.get('name');

  return (  
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>Black Spiderman escaping the cops</CardDescription>
      </CardHeader>
      <CardContent>
       <div className="grid w-full items-center gap-4">
        <Label htmlFor="name">Miles Morales</Label>
        <div >
        <img id="name" src="https://i.pinimg.com/564x/03/03/cb/0303cb902668afe4ac55343d21820c8e.jpg" className="h-[400px] w-[250px] align-middle" alt="imagep" />
        </div>
       </div>
       
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button>Watch</Button>
      </CardFooter>
    </Card>
  )
}
