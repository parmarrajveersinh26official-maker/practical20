export default function EmployeeCard({
  employee,
  onEdit,
  onDelete,
}) {
  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm">
      <h3 className="text-lg font-bold">{employee.name}</h3>

      <p className="text-gray-600">{employee.email}</p>

      <p className="mt-2">
        Department: <strong>{employee.department}</strong>
      </p>

      <p className="mb-4">
        Salary: <strong>₹{employee.salary}</strong>
      </p>

      <div className="flex gap-3">
        <button
          onClick={() => onEdit(employee)}
          className="rounded bg-amber-500 px-4 py-2 text-white"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(employee.id)}
          className="rounded bg-red-600 px-4 py-2 text-white"
        >
          Delete
        </button>
      </div>
    </div>
  );
}