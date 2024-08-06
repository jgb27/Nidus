import Layout from "@/components/admin/layout/articleAdmin";
import React, { useState, useCallback } from "react";
import axio from "axios";
import { Button, Container, FormControl, Heading, Input, Textarea, useToast } from "@chakra-ui/react";

const Contact: React.FC = () => {
    const toast = useToast();

    const [status, setStatus] = useState({
        submitted: false,
        submitting: false,
        info: { error: false, msg: null }
    });

    const [inputs, setInputs] = useState({
        company: "",
        email: "",
        message: ""
    });

    const handlOnChange = useCallback((e: { persist: () => void; target: { id: any; value: any; }; }) => {
        e.persist();
        setInputs((prev) => ({
            ...prev,
            [e.target.id]: e.target.value
        }));
        setStatus({
            submitted: false,
            submitting: false,
            info: { error: false, msg: null }
        });
    }, []);

    const handleServerResponse = useCallback((ok: any, msg: any) => {
        if (ok) {
            setStatus({
                submitted: true,
                submitting: false,
                info: { error: false, msg }
            });
            setInputs({
                company: "",
                email: "",
                message: ""
            });
        } else {
            setStatus({
                submitted: false,
                submitting: false,
                info: { error: true, msg }
            });
        }
    }, []);

    const handleOnSubmit = useCallback((e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setStatus((prevStatus) => ({ ...prevStatus, submitting: true }));
        axio({
            method: "POST",
            url: process.env.NEXT_PUBLIC_CONTACT_FORM,
            data: inputs
        })
            .then(() => {
                handleServerResponse(true, "Mensagem enviada com sucesso! Entraremos em contato em breve.");
            })
            .catch((error) => {
                handleServerResponse(false, "Ocorreu um erro ao enviar a mensagem. Tente novamente mais tarde.");
                console.error(error);
            });
    }, [inputs, handleServerResponse]);


    return (
        <Layout title="Contato">
            <Container
                maxW={{ base: "container.xl", md: "container.sm" }}
                display='flex'
                flexDirection='column'
                alignItems='center'
                justifyContent='center'
                p={4}
                gap={6}
            >
                <Heading as='h1' size='2xl' textAlign='center' color="#2C3E50">
                    Entre em contato
                </Heading>

                {status.submitted && (
                    toast({
                        title: status.info.error ? "Erro" : "Sucesso",
                        description: status.info.msg,
                        status: status.info.error ? "error" : "success",
                        duration: 9000,
                        isClosable: true,
                    })
                )}

                <FormControl
                    as='form'
                    onSubmit={handleOnSubmit}
                    display='flex'
                    flexDirection='column'
                    alignItems='center'
                    justifyContent='center'
                    gap={4}

                >
                    <Input
                        borderWidth={2}
                        borderColor="#2C3E50"
                        borderRadius={10}
                        px={8}
                        py={2}
                        id='company'
                        type='text'
                        value={inputs.company}
                        onChange={handlOnChange}
                        _hover={
                            {
                                borderColor: "#3498DB"
                            }
                        }
                        placeholder="Nome da empresa ou Pessoal"
                        _placeholder={{ color: "#2C3E50", fontSize: "lg" }}
                        required
                    />
                    <Input
                        borderWidth={2}
                        borderColor="#2C3E50"
                        borderRadius={10}
                        px={8}
                        py={2}
                        id='email'
                        type='email'
                        value={inputs.email}
                        onChange={handlOnChange}
                        _hover={
                            {
                                borderColor: "#3498DB"
                            }
                        }
                        placeholder='Email'
                        _placeholder={{ color: "#2C3E50", fontSize: "lg" }}
                        required
                    />

                    <Textarea
                        borderWidth={2}
                        borderColor="#2C3E50"
                        borderRadius={10}
                        px={8}
                        py={2}
                        minHeight={"16em"}
                        maxLength={1048576}
                        id='message'
                        value={inputs.message}
                        onChange={handlOnChange}
                        _hover={
                            {
                                borderColor: "#3498DB"
                            }
                        }
                        placeholder='Escreva sua mensagem'
                        _placeholder={{ color: "#2C3E50", fontSize: "lg" }}
                        size='sm'
                        required
                    />

                    <Button
                        type='submit'
                        disabled={status.submitting}
                        bgColor="#3498DB"
                        color="#ffffff"
                        borderRadius={10}
                        _hover={{ bgColor: "#2C3E50" }}
                        letterSpacing={1}
                        px={8}
                        py={2}
                    >
                        {!status.submitting
                            ? !status.submitted
                                ? 'Enviar'
                                : 'Enviado'
                            : 'Enviando...'}
                    </Button>
                </FormControl>
            </Container>
        </Layout>
    )
}

export default Contact;