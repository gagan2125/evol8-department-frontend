const Card = ({ count, activeCount }) => {
  return (
    <div className="max-w-sm bg-white shadow-lg rounded-lg overflow-hidden ml-0 mt-12">
      <div className="p-6">
        <div className="flex items-start">
          <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex justify-center items-center text-2xl font-bold">
            {count}
          </div>
          <div className="ml-4">
            <h4 className="text-xl font-semibold text-gray-700">Departments</h4>
            <p className="text-gray-500">Total Active - {activeCount}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
