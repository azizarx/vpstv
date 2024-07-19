import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRef } from "react";

function fetchtorrent(value: string|undefined) {
    console.log(value);
    fetch('http://localhost:3000/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({value})
    }).then(res => res.text()).then(res => console.log(res));
}
export default function UrlInput() {
    const ref = useRef<HTMLInputElement>(null);

  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input type="text" placeholder="URL" ref={ref} />
      <Button onClick={()=>fetchtorrent(ref?.current?.value)} type="submit">Subscribe</Button>
    </div>
  )
}
