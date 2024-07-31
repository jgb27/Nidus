import React from "react";

const TrustedBy: React.FC = () => {
    return (
        <section className="bg-white text-black min-h-screen flex flex-col justify-center gap-16 md:gap-32">
            <div className="flex flex-col justify-center items-center">
                <h3 className="text-xl mb-10 font-bold text-center">
                    <span className="whitespace-nowrap">Confiável por</span>{' '}
                    <span className="whitespace-nowrap">alguns dos aplicativos que você usa diariamente</span>
                </h3>
            </div>
            <div className="flex flex-col justify-center items-center">
                <div className="container mx-auto lg:max-w-[70%] lh:px-10">
                    <h3 className="text-3xl lg:text-4xl tracking-tight text-center px-10 !leading-[3.5rem]">
                        Acreditamos em uma boa comunicação e em um processo de desenvolvimento totalmente transparente.
                    </h3>
                </div>
            </div>
        </section>
    )
};

export default TrustedBy;