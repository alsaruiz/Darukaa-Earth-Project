import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import PolygonMapEditor from './PolygonMapEditor.jsx';

export default function EditPolygonModal({ isOpen, onClose, geometry, onSave }) {
  const [currentPoints, setCurrentPoints] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (geometry?.coordinates?.[0]) {
      setCurrentPoints(geometry.coordinates[0]);
    } else {
      setCurrentPoints([]);
    }
    setError('');
  }, [geometry, isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    if (!currentPoints || currentPoints.length < 3) {
      setError('A polygon boundary requires at least 3 corner points.');
      return;
    }

    // Ensure polygon is closed
    const pts = [...currentPoints];
    const first = pts[0];
    const last = pts[pts.length - 1];
    if (first[0] !== last[0] || first[1] !== last[1]) {
      pts.push([first[0], first[1]]);
    }

    onSave({
      type: 'Polygon',
      coordinates: [pts],
    });
    setError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/25 backdrop-blur-[2px]">
      <div
        id="edit-polygon-dialog"
        className="w-full max-w-2xl bg-[#FAFBFD] rounded-xl border border-[#DEC8D4] p-5 shadow-xl max-h-[94vh] flex flex-col"
      >
        <div className="flex items-center justify-between pb-3 border-b border-[#F0E2EA]">
          <div>
            <h2 className="text-base font-bold text-[#0F0C0E]">Edit site boundary map</h2>
            <p className="text-xs text-[#332A30] font-medium mt-0.5">
              Click map to add vertices or drag points with the mouse to reshape the site.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-[#332A30] hover:text-[#0F0C0E] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="pt-3 overflow-y-auto pr-1 flex-1">
          {/* Interactive Map Drawable Interface + Live Coordinates Section */}
          <PolygonMapEditor
            initialPoints={geometry?.coordinates?.[0] || []}
            onChange={(newPoints) => {
              setCurrentPoints(newPoints);
              if (error && newPoints && newPoints.length >= 3) {
                setError('');
              }
            }}
            height={380}
          />
          {error && (
            <p className="text-xs text-[#E03137] mt-1.5 font-medium">{error}</p>
          )}
        </div>

        {/* Modal Actions */}
        <div className="flex items-center justify-end gap-2.5 pt-3 mt-2 border-t border-[#F0E2EA]">
          <button
            id="cancel-polygon-btn"
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-medium text-[#332A30] hover:text-[#0F0C0E] rounded border border-[#DEC8D4] bg-[#FAF5F7]/80 hover:bg-[#FAF6F8] transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            id="save-polygon-btn"
            type="button"
            onClick={handleSave}
            className="px-4 py-1.5 text-xs font-medium text-white bg-[#D65D80] hover:bg-[#C44E72] rounded transition-colors active:scale-[0.98] cursor-pointer"
          >
            Save boundary
          </button>
        </div>
      </div>
    </div>
  );
}
