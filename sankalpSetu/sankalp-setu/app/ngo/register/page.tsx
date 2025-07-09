"use client";
import React from "react";
import { useState } from "react";

const NGO_TYPE_OPTIONS = [
  "Trust",
  "Society",
  "Section 8 Company",
];

const AREAS_OF_WORK = [
  "Education",
  "Health",
  "Women Empowerment",
  "Skill Development",
  "Environment",
  "Livelihood",
  "Other",
];

export default function NGORegisterPage() {
  const [form, setForm] = useState<{
    name: string;
    registration_number: string;
    date_of_establishment: string;
    ngo_type: string;
    contact_person: string;
    phone: string;
    email: string;
    address: string;
    areas_of_work: string[];
    registration_certificate: File | null;
    password: string;
    confirm_password: string;
  }>({
    name: "",
    registration_number: "",
    date_of_establishment: "",
    ngo_type: "",
    contact_person: "",
    phone: "",
    email: "",
    address: "",
    areas_of_work: [],
    registration_certificate: null,
    password: "",
    confirm_password: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<any>({});
  const [readOnly, setReadOnly] = useState(false);

  function handleChange(e: any) {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setForm({ ...form, [name]: files[0] });
    } else if (name === "areas_of_work") {
      const options = Array.from(e.target.selectedOptions, (option: any) => option.value);
      setForm({ ...form, areas_of_work: options });
    } else {
      setForm({ ...form, [name]: value });
    }
  }

  function validateForm() {
    const errors: any = {};
    if (!form.name.trim()) errors.name = "NGO Name is required";
    if (!form.registration_number.trim()) errors.registration_number = "Registration Number is required";
    if (!form.date_of_establishment) errors.date_of_establishment = "Date of Establishment is required";
    if (!form.ngo_type) errors.ngo_type = "NGO Type is required";
    if (!form.contact_person.trim()) errors.contact_person = "Contact Person is required";
    if (!form.phone || !/^[0-9]{10}$/.test(form.phone)) errors.phone = "Phone number must be exactly 10 digits";
    if (!form.email || !/^([a-zA-Z0-9_\.-]+)@gmail\.com$/.test(form.email)) errors.email = "Valid Gmail address is required (e.g. example@gmail.com)";
    if (!form.address.trim()) errors.address = "Address is required";
    if (!form.areas_of_work.length) errors.areas_of_work = "Select at least one area of work";
    if (!form.registration_certificate) errors.registration_certificate = "Upload registration certificate";
    if (!form.password) errors.password = "Password is required";
    if (form.password !== form.confirm_password) errors.confirm_password = "Passwords do not match";
    return errors;
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    setError("");
    setSuccess("");
    const errors = validateForm();
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setLoading(true);
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (key === "areas_of_work") {
        (value as string[]).forEach((v) => formData.append("areas_of_work", v));
      } else if (key === "registration_certificate" && value) {
        formData.append(key, value as File);
      } else {
        formData.append(key, value as string);
      }
    });

    try {
      const res = await fetch("/api/ngo/register/", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        setSuccess("NGO registered successfully!");
        setReadOnly(true);
        // Do not reset form, keep values for read-only display
      } else {
        const data = await res.json();
        setError(data?.detail || "Registration failed. Please try again.");
      }
    } catch {
      setError("Registration failed. Please try again.");
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background py-8">
      <div className="container mx-auto max-w-2xl">
        <form
          onSubmit={handleSubmit}
          className="bg-card border border-purple-300/40 rounded-xl p-8 shadow-xl space-y-4"
          encType="multipart/form-data"
        >
          <h2 className="text-2xl font-bold text-purple-500 mb-6 flex items-center gap-2 justify-center">
            <span role="img" aria-label="NGO">📄</span> NGO Registration
          </h2>
          {success && <div className="bg-green-100 text-green-800 px-4 py-2 rounded mb-2">{success}</div>}
          {error && <div className="bg-red-100 text-red-800 px-4 py-2 rounded mb-2">{error}</div>}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">NGO Name</label>
              <input name="name" value={form.name} onChange={handleChange} className={`w-full rounded px-3 py-2 bg-background border ${readOnly ? "bg-purple-50 font-bold" : ""}`} placeholder="e.g. Helping Hands Foundation" readOnly={readOnly} disabled={readOnly} />
              {fieldErrors.name && <div className="text-red-500 text-xs">{fieldErrors.name}</div>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Registration Number</label>
              <input name="registration_number" value={form.registration_number} onChange={handleChange} className={`w-full rounded px-3 py-2 bg-background border ${readOnly ? "bg-purple-50 font-bold" : ""}`} placeholder="e.g. 123/TS/2022" readOnly={readOnly} disabled={readOnly} />
              {fieldErrors.registration_number && <div className="text-red-500 text-xs">{fieldErrors.registration_number}</div>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Date of Establishment</label>
              <input name="date_of_establishment" type="date" value={form.date_of_establishment} onChange={handleChange} className={`w-full rounded px-3 py-2 bg-background border ${readOnly ? "bg-purple-50 font-bold" : ""}`} placeholder="Select date" readOnly={readOnly} disabled={readOnly} />
              {fieldErrors.date_of_establishment && <div className="text-red-500 text-xs">{fieldErrors.date_of_establishment}</div>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">NGO Type</label>
              <select name="ngo_type" value={form.ngo_type} onChange={handleChange} className={`w-full rounded px-3 py-2 bg-background border ${readOnly ? "bg-purple-50 font-bold" : ""}`} disabled={readOnly}>
                <option value="">Select NGO Type</option>
                {NGO_TYPE_OPTIONS.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              {fieldErrors.ngo_type && <div className="text-red-500 text-xs">{fieldErrors.ngo_type}</div>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Contact Person</label>
              <input name="contact_person" value={form.contact_person} onChange={handleChange} className={`w-full rounded px-3 py-2 bg-background border ${readOnly ? "bg-purple-50 font-bold" : ""}`} placeholder="e.g. Priya Sharma" readOnly={readOnly} disabled={readOnly} />
              {fieldErrors.contact_person && <div className="text-red-500 text-xs">{fieldErrors.contact_person}</div>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Phone</label>
              <input name="phone" value={form.phone} onChange={handleChange} className={`w-full rounded px-3 py-2 bg-background border ${readOnly ? "bg-purple-50 font-bold" : ""}`} placeholder="10-digit mobile number" maxLength={10} readOnly={readOnly} disabled={readOnly} />
              {fieldErrors.phone && <div className="text-red-500 text-xs">{fieldErrors.phone}</div>}
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Email</label>
              <input name="email" value={form.email} onChange={handleChange} className={`w-full rounded px-3 py-2 bg-background border ${readOnly ? "bg-purple-50 font-bold" : ""}`} placeholder="e.g. example@gmail.com" readOnly={readOnly} disabled={readOnly} />
              {fieldErrors.email && <div className="text-red-500 text-xs">{fieldErrors.email}</div>}
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Address</label>
              <textarea name="address" value={form.address} onChange={handleChange} className={`w-full rounded px-3 py-2 bg-background border ${readOnly ? "bg-purple-50 font-bold" : ""}`} placeholder="e.g. 123, Main Street, Mumbai, Maharashtra" readOnly={readOnly} disabled={readOnly} />
              {fieldErrors.address && <div className="text-red-500 text-xs">{fieldErrors.address}</div>}
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Areas of Work</label>
              <select
                name="areas_of_work"
                multiple
                value={form.areas_of_work}
                onChange={handleChange}
                className={`w-full rounded px-3 py-2 bg-background border h-24 ${readOnly ? "bg-purple-50 font-bold" : ""}`}
                disabled={readOnly}
              >
                {AREAS_OF_WORK.map((area) => (
                  <option key={area} value={area}>{area}</option>
                ))}
              </select>
              {fieldErrors.areas_of_work && <div className="text-red-500 text-xs">{fieldErrors.areas_of_work}</div>}
              <div className="text-xs text-muted-foreground">Hold Ctrl or Cmd to select multiple.</div>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Upload Registration Certificate</label>
              <input name="registration_certificate" type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={handleChange} className="w-full" disabled={readOnly} />
              {fieldErrors.registration_certificate && <div className="text-red-500 text-xs">{fieldErrors.registration_certificate}</div>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input name="password" type="password" value={form.password} onChange={handleChange} className={`w-full rounded px-3 py-2 bg-background border ${readOnly ? "bg-purple-50 font-bold" : ""}`} placeholder="Create a password" readOnly={readOnly} disabled={readOnly} />
              {fieldErrors.password && <div className="text-red-500 text-xs">{fieldErrors.password}</div>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Confirm Password</label>
              <input name="confirm_password" type="password" value={form.confirm_password} onChange={handleChange} className={`w-full rounded px-3 py-2 bg-background border ${readOnly ? "bg-purple-50 font-bold" : ""}`} placeholder="Re-enter password" readOnly={readOnly} disabled={readOnly} />
              {fieldErrors.confirm_password && <div className="text-red-500 text-xs">{fieldErrors.confirm_password}</div>}
            </div>
          </div>
          {!readOnly && (
            <button
              type="submit"
              className="w-full mt-6 py-2 rounded bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold text-lg shadow hover:from-pink-600 hover:to-purple-600 transition"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register NGO"}
            </button>
          )}
          {readOnly && (
            <div className="flex gap-4 mt-4">
              <button
                className="px-4 py-2 rounded bg-blue-500 text-white font-bold"
                onClick={() => setReadOnly(false)}
                type="button"
              >
                Edit
              </button>
              <button
                className="px-4 py-2 rounded bg-gray-400 text-white font-bold"
                onClick={() => window.location.href = '/'}
                type="button"
              >
                Back
              </button>
            </div>
          )}
        </form>
        <div className="bg-card border border-purple-200/40 rounded-xl p-6 shadow mt-8 w-full">
          <h3 className="text-lg font-bold text-purple-400 mb-2 flex items-center gap-2">
            <span role="img" aria-label="Tips">📌</span> Tips for Registration
          </h3>
          <ul className="list-disc list-inside text-muted-foreground space-y-1 text-sm">
            <li>Use your official registration details</li>
            <li>Double-check your contact information</li>
            <li>Use a secure password</li>
            <li>Upload only valid documents</li>
            <li>Select accurate areas of work</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 