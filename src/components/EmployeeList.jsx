import EmployeeCard from "./EmployeeCard";

export default function EmployeeList({
  employees,
  onEdit,
  onDelete,
}) {
  if (employees.length === 0) {
    return (
      <p className="rounded-xl bg-white p-6 text-gray-500">
        No employees found. Add your first employee!
      </p>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {employees.map((employee) => (
        <EmployeeCard
          key={employee.id}
          employee={employee}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}