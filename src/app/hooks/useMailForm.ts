// import { zodResolver } from "@hookform/resolvers/zod";
// import { useCallback } from "react";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { formSchema } from "../lib/formSchema";

// export const useMailForm = () => {
//   const form = useForm<z.infer<typeof formSchema>>({//typescript generics
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       username: "",
//       subject: "",
//       email: "",
//       content: "",
//       file: undefined,
//     },
//   });

//   const onSubmit = useCallback(async (values: z.infer<typeof formSchema>) => {
//     const {username, email, subject, content, file} = values;
//     const formData = new FormData();
//     formData.append("username", username);
//     formData.append("email", email);
//     formData.append("subject", subject);
//     formData.append("content", content);
//     if (file) {
//       formData.append("file", file[0]);
//     }
//     // const buffer = Buffer.from(await file.arrayBuffer());

//     try {
//       await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/send`,{
//         method: "POST",
//         // headers:{
//         //   "Content-Type": "application/json"
//         // },
//         body: formData,
//       });
//     } catch (err) {
//       console.log(err)
//     }
//   }, []); //メモ化(コンポーネントの再レンダリングを防ぐ記述)再生成してほしくない処理はメモ化する。
//   //カスタムフックは基本的にメモ化することが多いらしい。
//   return { form, onSubmit };
// };

// export default useMailForm;