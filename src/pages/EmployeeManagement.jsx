import { useEffect, useState } from "react";
import EmployeeForm from "../components/EmployeeForm";
import EmployeeList from "../components/EmployeeList";

const API_URL = "https://jsonplaceholder.typicode.com/users";

export default function EmployeeManagement() {
  const [employees, setEmployees] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function loadEmployees() {
      try {
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error("Unable to load employees");
        }

        const data = await response.json();

        const formattedEmployees = data.slice(0, 5).map((user) => ({
          id: user.id,
          name: user.name,
          email: user.email,
          department: user.company.name,
          salary: user.id * 10000,
        }));

        setEmployees(formattedEmployees);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadEmployees();
  }, []);

  function saveEmployee(employee) {
    if (editingEmployee) {
      setEmployees((previous) =>
        previous.map((item) =>
          item.id === editingEmployee.id
            ? { ...employee, id: editingEmployee.id }
            : item
        )
      );

      setEditingEmployee(null);
    } else {
      setEmployees((previous) => [
        ...previous,
        { ...employee, id: Date.now() },
      ]);
    }
  }

  function deleteEmployee(id) {
    setEmployees((previous) =>
      previous.filter((employee) => employee.id !== id)
    );

    if (editingEmployee?.id === id) {
      setEditingEmployee(null);
    }
  }

  const filteredEmployees = employees.filter((employee) =>
    `${employee.name} ${employee.email} ${employee.department}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-5xl">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Employee Management System
          </h1>

          <p className="mt-2 text-gray-600">
            Manage employee records in one place.
          </p>
        </header>

        <EmployeeForm
          editingEmployee={editingEmployee}
          onSave={saveEmployee}
          onCancel={() => setEditingEmployee(null)}
        />

        <section>
          <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <h2 className="text-2xl font-bold">
              Employees ({filteredEmployees.length})
            </h2>

            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search employees..."
              className="rounded-lg border bg-white p-3"
            />
          </div>

          {loading ? (
            <p className="rounded bg-white p-4">
              Loading employees...
            </p>
          ) : error ? (
            <p className="rounded bg-red-50 p-4 text-red-600">
              {error}
            </p>
          ) : (
            <EmployeeList
              employees={filteredEmployees}
              onEdit={setEditingEmployee}
              onDelete={deleteEmployee}
            />
          )}
        </section>
      </div>
    </main>
  );
}