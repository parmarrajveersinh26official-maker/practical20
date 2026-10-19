import { useState } from "react";

const emptyEmployee = {
  name: "",
  email: "",
  department: "",
  salary: "",
};

export default function EmployeeForm({
  editingEmployee,
  onSave,
  onCancel,
}) {
  const [form, setForm] = useState(emptyEmployee);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    onSave({
      ...editingEmployee,
      ...form,
      salary: Number(form.salary),
    });

    setForm(emptyEmployee);
  }

  function handleCancel() {
    setForm(emptyEmployee);
    onCancel();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-8 grid gap-4 rounded-xl bg-white p-6 shadow sm:grid-cols-2"
    >
      <h2 className="text-xl font-bold sm:col-span-2">
        {editingEmployee ? "Update Employee" : "Add Employee"}
      </h2>

      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Employee Name"
        className="rounded border p-3"
        required
      />

      <input
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email Address"
        className="rounded border p-3"
        required
      />

      <input
        name="department"
        value={form.department}
        onChange={handleChange}
        placeholder="Department"
        className="rounded border p-3"
        required
      />

      <input
        name="salary"
        type="number"
        min="0"
        value={form.salary}
        onChange={handleChange}
        placeholder="Salary"
        className="rounded border p-3"
        required
      />

      <div className="flex gap-3 sm:col-span-2">
        <button
          type="submit"
          className="rounded bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
        >
          {editingEmployee ? "Update Employee" : "Add Employee"}
        </button>

        {editingEmployee && (
          <button
            type="button"
            onClick={handleCancel}
            className="rounded bg-gray-200 px-5 py-3"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}