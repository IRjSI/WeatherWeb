import {Input} from "@nextui-org/react";
import { SearchIcon } from "./SearchIcon";
import {Button} from "@nextui-org/react";
import { useState } from "react";
import Mode from "./Mode";

export default function Search() {

    const [location,setLocation] = useState(null);
    const [query,setQuery] = useState("");
    const apiKey = String(import.meta.env.VITE_API_KEY);
    const host = String(import.meta.env.VITE_HOST);
    
    const findWeather = async (e) => {
        e.preventDefault();

        const url = `https://yahoo-weather5.p.rapidapi.com/weather?location=${query}&format=json&u=c`;
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': `${apiKey}`,
                'x-rapidapi-host': `${host}`
            }
        };

        try {
            const response = await fetch(url, options);
            const result = await response.json();
            console.log(result);
            if (result) {
                setLocation({
                    city: result.location.city,
                    country: result.location.country,
                    temperature: result.current_observation.condition.temperature,
                    climate: result.current_observation.condition.text
                })
            } else {
                setLocation({error: "City not Found!"});
            }
        } catch (error) {
            console.error(error);
            setLocation({error: "City not Found!"});
        }
    }

    return (
        <>
        <div className='text-center pt-8 mb-24 flex'>
            <div>
                <p>Weather Web</p>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1283 132" fill="#FFFFFF"><path d="M1282.46 5.79c-.91-3.88-5.18-6.65-9.04-5.54-104.37 29.02-193.78 56.87-361.6 74.53-268.41 28.16-539.6 14.6-803.08-26.38C94.9 47.97-.34 26.24.08 41.38c-1.56 14.21 19.47 12.91 29.6 17.24 32.82 8.6 66.1 15.33 99.4 21.81 238.99 44.43 482.98 55.29 725.63 49.01 92.37-4.11 185.68-9.96 275.51-33.09 18.68-6.31 42.79-9.21 55.18-25.89 6.76-13.28-12.41-21.16-13.83-6.12-17.69 11.67-39.31 15.61-59.45 21.34-114.56 25.18-245.31 30.46-361.99 30.36-191.39.45-383.13-10.13-572-42.21 277.31 36.42 560.77 44.96 837.82 2.23 104.21-15.4 195.11-42.74 260.97-61.22a7.57 7.57 0 0 0 5.54-9.05Z"></path></svg>
            </div>
            
            {/* <div className="bg-violet-500 w-[500px] h-[500px] rounded-s-full opacity-10 blur-3xl absolute right-4">
            </div> */}

            {/* <div className="bg-blue-500 w-[500px] h-[500px] rounded-e-full opacity-10 blur-3xl absolute top-4 left-4">
            </div> */}

            {/* <div className="absolute top-4 right-4">
                <Mode />
            </div> */}
        </div>
        <div className="sm:w-[440px] sm:h-[240px] w-[340px] h-[180px] mb-8 px-8 rounded-2xl flex justify-center bg-gradient-to-bl from-[#222222] to-[#121212] text-white shadow-lg flex-col">
        <div>
        <form className="flex w-full justify-center gap-3" onSubmit={findWeather}>
            <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            classNames={{
                label: "text-black/50 dark:text-white/90",
                input: [
                    "bg-transparent",
                    "text-black/90 dark:text-white/90",
                    "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                ],
                innerWrapper: "bg-transparent",
                inputWrapper: [
                    "shadow-xl",
                    "bg-default-200/50",
                    "dark:bg-default/60",
                    "backdrop-blur-xl",
                    "backdrop-saturate-200",
                    "hover:bg-default-200/70",
                    "dark:hover:bg-default/70",
                    "group-data-[focus=true]:bg-default-200/50",
                    "dark:group-data-[focus=true]:bg-default/60",
                    "!cursor-text",
                ],
            }}
            label="Search"
            placeholder="Type to search..."
            radius="lg"
            startContent={
                <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
            }
            />
            <Button type="submit" color="primary" variant="shadow" className="h-[56px]">
                Search
            </Button>
        </form>
        </div>

        <div >
        
        {location ? (
                location.error ? (
                    <p className="mt-4 text-red-500">{location.error}</p>
                ) : (
                    <ul className="mt-4 space-y-2">
                        <li>City:<strong> {location.city}</strong></li>
                        <li>Country:<strong> {location.country}</strong></li>
                        <li>Temperature:<strong> {location.temperature}°C</strong></li>
                        <li>Climate:<strong> {location.climate}</strong></li>
                    </ul>
                )
            ) : null}
      
              </div>
              </div>
              
        </>      
    );
  }