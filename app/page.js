import Hero from "@/components/hero";
import { ToggleTheme } from "@/components/toggle-theme";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { featuresData, howItWorksData, statsData, testimonialsData } from "@/data/landing";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function HOME() {
  return (
    <>
      <div className="mt-20 px-4">
        <div className="fixed top-24 z-50 py-1 right-4">
          <ToggleTheme />
        </div>
        {/* Hero Section */}
        <div className="pb-20">
          <Hero />
        </div>

        <section className="py-20 bg-blue-50 dark:bg-slate-950 rounded-md">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {statsData.map((item, index) => {
                return (
                  <div key={index} className="text-center">
                    <div className="text-4xl font-bold text-blue-600 mb-2">
                      {item.value}
                    </div>
                    <div className="text-gray-600 dark:text-gray-500 font-semibold">
                      {item.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Feature Section */}

        <section className="py-20 ">
          <div className="container mx-auto px-4">
            <h2 className="md:text-3xl text-2xl dark:text-gray-300 text-gray-800 font-bold text-center mb-12">
              Manage all your finances with ease.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuresData.map((feature, index) => {
                return (
                  <Card
                    key={index}
                    className={"p-6 dark:bg-[#09090b] bg-blue-100"}
                  >
                    <CardContent
                      className={
                        "space-y-4 pt-2 text-center flex items-center justify-center flex-col"
                      }
                    >
                      {feature.icon}
                      <h3 className="text-xl font-semibold dark:text-gray-400 text-gray-800">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-500">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* How it works section */}

        <section className="py-20 dark:bg-slate-950 bg-blue-50 rounded-md">
          <div className="container mx-auto px-4">
            <h2 className="md:text-3xl text-2xl dark:text-gray-300 text-gray-800 font-bold text-center mb-16">
              How it works?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {howItWorksData.map((step, index) => {
                return (
                  <div key={index} className="text-center p-3 flex justify-center items-center space-y-2 flex-col">
                    <div className="w-16 h-16 bg-blue-100  flex items-center justify-center rounded-full">{step.icon}</div>
                    <h3 className="text-xl dark:text-gray-300 text-gray-700 font-bold">{step.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 font-semibold">{step.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}

          <section className="py-20 ">
          <div className="container mx-auto px-4">
            <h2 className="md:text-3xl text-2xl dark:text-gray-300 text-gray-800 font-bold text-center mb-12">
              What Our Users Say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonialsData.map((testimonial, index) => {
                return (
                  <Card
                    key={index}
                    className={"p-6 dark:bg-[#09090b] bg-blue-100"}
                  >
                    <CardContent
                      className={
                        " pt-2"
                      }
                    >
                     <div className="flex items-center">
                      <Image src={testimonial.image} alt={testimonial.name} width={40} height={40} className="rounded-full">

                      </Image>
                      <div className="ml-4">
                        <div className="font-semibold dark:text-gray-200 text-gray-800">
                          {testimonial.name}
                        </div>
                        <div className="text-sm font-medium dark:text-gray-400 text-gray-600">
                          {testimonial.role}
                        </div>
                      </div>  
                     </div>
                     <p className="dark:text-gray-400 text-gray-700 my-3">{testimonial.quote}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Call to action Section */}
          <section className="py-20 dark:bg-gray-800 bg-gray-300 rounded-md">
          <div className="container mx-auto text-center px-4">
            <h2 className="md:text-3xl text-2xl dark:text-gray-100 text-gray-900 font-bold text-center mb-4">
              Take charge of your financial future today
            </h2>
            <p className="text-gray-700 dark:text-gray-400 font-semibold mb-8 max-w-2xl mx-auto">
              Experience the trusted platform helping people just like you save more, spend wisely, and invest in their future—financial clarity is just one step away.
            </p>
            <Link href={'/dashboard'}>
            <Button size="lg"
                    className="bg-white font-bold cursor-pointer text-blue-600 hover:bg-blue-50 animate-bounce"
                    >
                  Start Free Trial
                  <ChevronRight className="h-5 w-5"/>
            </Button>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
