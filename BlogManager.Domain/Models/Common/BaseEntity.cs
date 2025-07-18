using System;

namespace BlogManager.Domain.Models.Common
{
    public abstract class BaseEntity<T>
    {
        protected BaseEntity()
        {
            CreatedDate = DateTime.Now;
        }

        public T Id { get; set; }
        public DateTime? LastChangeDate { get; set; }
        public DateTime CreatedDate { get; set; }
        public bool IsDeleted { get; set; }
    }

    public abstract class BaseEntity : BaseEntity<int> { }
}
