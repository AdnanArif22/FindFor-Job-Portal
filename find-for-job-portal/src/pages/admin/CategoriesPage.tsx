import React, { useState } from 'react';
import { useJobs } from '../../context/JobContext';
import { useToast } from '../../context/ToastContext';
import { Modal } from '../../components/common/Modal';
import { ConfirmDialog } from '../../components/common/ConfirmDialog';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { JobCategory } from '../../types';
import {
  FolderKanban,
  Plus,
  Edit2,
  Trash2,
  Layers,
  Code,
  Sparkles
} from 'lucide-react';

export const CategoriesPage: React.FC = () => {
  const { categories, addCategory, updateCategory, deleteCategory } = useJobs();
  const { showSuccess, showInfo } = useToast();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<JobCategory | null>(null);
  const [categoryToDelete, setCategoryToDelete] = useState<JobCategory | null>(null);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [iconName, setIconName] = useState('Code');

  const handleOpenAdd = () => {
    setEditingCategory(null);
    setName('');
    setDescription('');
    setIconName('Code');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (cat: JobCategory) => {
    setEditingCategory(cat);
    setName(cat.name);
    setDescription(cat.description);
    setIconName(cat.iconName);
    setIsModalOpen(true);
  };

  const handleSaveCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    if (editingCategory) {
      updateCategory(editingCategory.id, {
        name,
        slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        description,
        iconName,
      });
      showSuccess('Category Updated (Demo)', `"${name}" updated successfully.`);
    } else {
      addCategory({
        name,
        slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        description,
        iconName,
        popularSkills: ['General', 'Strategy', 'Analytics'],
      });
      showSuccess('Category Added (Demo)', `"${name}" added to platform taxonomy.`);
    }

    setIsModalOpen(false);
  };

  const handleConfirmDelete = () => {
    if (categoryToDelete) {
      deleteCategory(categoryToDelete.id);
      showInfo('Category Removed (Demo)', `Deleted category "${categoryToDelete.name}".`);
      setCategoryToDelete(null);
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <Breadcrumbs
        items={[
          { label: 'Admin Dashboard', path: '/admin/dashboard' },
          { label: 'Job Categories' },
        ]}
      />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-800 tracking-tight">
            Job Category Taxonomy
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Organize recruitment disciplines, descriptions, and icon mappings.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-teal-500 hover:bg-teal-600 text-white font-bold text-xs rounded-xl shadow-soft transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Category</span>
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-soft-sm hover:shadow-soft-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center font-bold">
                  <FolderKanban className="w-5 h-5" />
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleOpenEdit(cat)}
                    className="p-1.5 text-slate-400 hover:text-navy-800 rounded-lg hover:bg-slate-100"
                    title="Edit category"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setCategoryToDelete(cat)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-slate-100"
                    title="Delete category"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <h3 className="text-base font-bold text-navy-800">{cat.name}</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed line-clamp-2">
                {cat.description}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full">
                {cat.jobCount} Active Roles
              </span>
              <span className="text-[11px] font-mono text-slate-400">/{cat.slug}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingCategory ? 'Edit Job Category' : 'Create New Job Category'}
        description="Configure taxonomy label, URL slug, and description."
        maxWidth="md"
      >
        <form onSubmit={handleSaveCategory} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Category Title *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Artificial Intelligence & Robotics"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 text-navy-800 font-bold"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Summary Description</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Explain what roles and specialties belong in this category..."
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 text-navy-800"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Icon Representation</label>
            <select
              value={iconName}
              onChange={(e) => setIconName(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 text-navy-800"
            >
              <option value="Code">Code / Engineering</option>
              <option value="Palette">Palette / Design</option>
              <option value="BrainCircuit">BrainCircuit / AI & Data</option>
              <option value="TrendingUp">TrendingUp / Growth & Marketing</option>
              <option value="BadgeDollarSign">BadgeDollarSign / Finance</option>
              <option value="ShieldCheck">ShieldCheck / Cybersecurity</option>
            </select>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 text-slate-600 hover:text-navy-800 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-teal-500 hover:bg-teal-600 text-white font-bold rounded-xl shadow-soft"
            >
              {editingCategory ? 'Save Changes' : 'Create Category (Demo)'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={!!categoryToDelete}
        title="Delete Job Category"
        message={`Are you sure you want to remove "${categoryToDelete?.name}"? Jobs belonging to this category will remain, but will lose this taxonomy tag.`}
        confirmLabel="Yes, Delete Category"
        cancelLabel="Keep Category"
        isDestructive={true}
        onConfirm={handleConfirmDelete}
        onCancel={() => setCategoryToDelete(null)}
      />
    </div>
  );
};
