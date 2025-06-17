"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { generatePurseId } from "@/lib/utils";

import {
  Plus,
  Trash2,
  Key,
  User,
  Link as LinkIcon,
  ThumbsUp,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

const walletAddressSchema = z.object({
  type: z.string().min(1, "Wallet type is required"),
  address: z.string().min(1, "Wallet address is required"),
  label: z.string().optional(),
});

const linkSchema = z.object({
  title: z.string().min(1, "Link title is required"),
  url: z.string().url("Please enter a valid URL"),
});

const formSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(50, {
      message: "Username must be less than 50 characters.",
    }),
  avatar: z.string().optional(),
  bio: z
    .string()
    .max(500, {
      message: "Bio must be less than 500 characters.",
    })
    .optional(),
  walletAddresses: z.array(walletAddressSchema).min(1, {
    message: "At least one wallet address is required.",
  }),
  links: z.array(linkSchema).optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function CreatePurseForm() {
  const [purseId, setPurseId] = useState<string>("");
  const [avatarPreview, setAvatarPreview] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      avatar: "",
      bio: "",
      walletAddresses: [{ type: "Ethereum", address: "", label: "" }],
      links: [],
    },
  });

  const {
    fields: walletFields,
    append: appendWallet,
    remove: removeWallet,
  } = useFieldArray({
    control: form.control,
    name: "walletAddresses",
  });

  const {
    fields: linkFields,
    append: appendLink,
    remove: removeLink,
  } = useFieldArray({
    control: form.control,
    name: "links",
  });

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setAvatarPreview(result);
        form.setValue("avatar", result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (values: FormValues) => {
    console.log("Form submitted:", values);

    const username = values.username;
    try {
      const id = await generatePurseId(username);
      setPurseId(id);
    } catch (error) {
      console.error("Error generating purse ID:", error);
      toast.error("Failed to generate purse ID");
    }

    setIsSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {isSubmitted && purseId ? (
        <Card>
          <CardHeader className="text-center pb-4">
            <div className="mx-auto w-16 h-16 border rounded-full flex items-center justify-center mb-4">
              <ThumbsUp />
            </div>
            <CardTitle className="text-xl">
              Purse Created Successfully!
            </CardTitle>
            <CardDescription>
              Your digital purse has been created with a unique identifier. You
              can now share it with others or access it anytime.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Key className="h-5 w-5" />
                <h4 className="font-semibold">Your Unique Purse ID</h4>
              </div>

              <div className="p-4 rounded-lg border">
                <div className="font-mono text-sm break-all text-center py-2">
                  {purseId}
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button asChild className="flex-1">
                <Link href={`/${purseId}`}>
                  <User className="h-4 w-4 mr-2" />
                  View My Purse
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="flex-1"
                onClick={() => {
                  navigator.clipboard.writeText(purseId);
                  toast.success("Purse ID copied to clipboard!");
                }}
              >
                <LinkIcon className="h-4 w-4 mr-2" />
                Copy ID
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Create Your Purse
            </CardTitle>
            <CardDescription>
              Set up your digital purse with wallet addresses, links, and secure
              identification.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                {/* Basic Information Section */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold">Basic Information</h3>

                  {/* Avatar */}
                  <div className="flex items-center gap-4">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={avatarPreview} />
                      <AvatarFallback>
                        {form.watch("username")?.slice(0, 2).toUpperCase() ||
                          "??"}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <FormLabel htmlFor="avatar-upload">Avatar</FormLabel>
                      <Input
                        id="avatar-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarChange}
                        className="mt-1"
                      />
                      <p className="text-sm text-muted-foreground mt-1">
                        Upload a profile picture (optional)
                      </p>
                    </div>
                  </div>

                  {/* Username */}
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your username" {...field} />
                        </FormControl>
                        <FormDescription>
                          This is your public display name. It will be visible
                          to others.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Bio */}
                  <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bio</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell others about yourself..."
                            className="resize-none"
                            rows={3}
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          A brief description about yourself (optional, max 500
                          characters).
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Wallet Addresses Section */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Wallet Addresses</h3>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        appendWallet({ type: "", address: "", label: "" })
                      }
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Wallet
                    </Button>
                  </div>

                  {walletFields.map((field, index) => (
                    <Card key={field.id} className="p-4">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">Wallet {index + 1}</h4>
                          {walletFields.length > 1 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeWallet(index)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <FormField
                            control={form.control}
                            name={`walletAddresses.${index}.type`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Type</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="e.g., Ethereum, Bitcoin"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name={`walletAddresses.${index}.address`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Address</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Wallet address"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name={`walletAddresses.${index}.label`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Label (Optional)</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="e.g., Main wallet"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>

                {/* Links Section */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Links</h3>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => appendLink({ title: "", url: "" })}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Link
                    </Button>
                  </div>

                  {linkFields.map((field, index) => (
                    <Card key={field.id} className="p-4">
                      <div className="flex items-center gap-4">
                        <LinkIcon className="h-4 w-4 text-muted-foreground" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                          <FormField
                            control={form.control}
                            name={`links.${index}.title`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="e.g., Website, Twitter"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name={`links.${index}.url`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>URL</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="https://example.com"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeLink(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>

                {/* Submit Button */}
                <div className="pt-6">
                  <Button type="submit" className="w-full" size="lg">
                    Create Purse
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
